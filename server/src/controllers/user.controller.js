const { populate } = require("dotenv");
const config = require("../config");
const Department = require("../models/department.model");
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendMail = require("../utils/resetPassMail");
const verifyAccountTemplate = require("../templates/verify.template");
const Token = require("../models/token.model");
const createUser = async (req, res) => {
  try {
    const {
      fullName,
      email,
      password,
      departmentId,
      role
    } = req.body;

    const foundUser = await User.findOne({ email });
    if (foundUser) {
      return res.status(400).json({ message: "Email already exists" });
    }


    const hasPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      fullName,
      email,
      password: hasPassword,
      departmentId: role === "admin" ? null : departmentId,
      role,
    })

    if (role === "user" && departmentId) {
      const foundDepartment = await Department.findOne({
        _id: departmentId,
        isDelete: false,
        isActive: true
      });
      if (!foundDepartment) {
        return res.status(400).json({ message: "Invalid department ID" });
      }
      foundDepartment.users.push(newUser._id);
      await foundDepartment.save();
    }


    const refreshToken = jwt.sign(
      { userId: newUser._id },
      config.refresh_secret,
      { expiresIn: "14d" }
    );

    newUser.refreshToken = refreshToken;
    await newUser.save();


    const verifyToken = jwt.sign(
      {
        userId: newUser._id
      },
      config.reset_secret,
      {
        expiresIn: "15m"
      }
    );

    await Token.create({
      userId: newUser._id,
      token: verifyToken
    })

    const verifyLink = `http://localhost:5173/verify-account?token=${verifyToken}`;


    await sendMail(
      email,
      "Account Verify",
      verifyAccountTemplate({ fullName, verifyLink })
    );


    res.status(201).json({
      message: "User created successfully",
      data: newUser
    })

  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message })
  }
}


const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({
      isDelete: false,
      role: "user"
    }).populate("departmentId", "name");
    res.status(200).json({ message: "Users fetched successfully", data: users });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
}

const getSingleUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({
      _id: id,
      isDelete: false,
      role: "user"
    })
      .populate([
        {
          path: "departmentId",
          select: "name isActive",
          match: { isDelete: false }
        },
        {
          path: "tasks",
          select: "title description status dueDate createdBy isActive",
          match: { isDelete: false },
          populate: {
            path: "createdBy",
            select: "fullName email"
          }
        }
      ])

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({
      message: "User fetched successfully",
      data: user
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
}

const editUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { fullName, departmentId, role, email } = req.body;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const userExist = User.findOne({
      email: email,
      _id: { $ne: user._id }
    })
    if (userExist) {
      return res.status(409).json({
        message: "EMAIL EXISTS"
      });
    }

    user.fullName = fullName || user.fullName;
    user.departmentId = departmentId || user.departmentId;
    user.role = role || user.role;
    user.isActive = isActive !== undefined ? isActive : user.isActive;
    user.email = email || user.email


    await user.save();

    res.status(200).json({
      message: "User updated successfully",
      data: user
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
}

const changeStatus = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findOne({
      _id: id,
      isDelete: false
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      })
    }


    user.isActive = !user.isActive;


    await user.save();

    res.status(200).json({
      message: "User change successfull status",
      user
    })
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
}

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findOne({
      _id: id,
      isDelete: false
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      })
    }


    user.isDelete = true;


    await user.save();

    res.status(200).json({
      message: "User change successfull status",
      user
    })
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
}

module.exports = {
  createUser,
  getAllUsers,
  getSingleUser,
  editUser,
  changeStatus,
  deleteUser
}