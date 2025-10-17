const Department = require("../models/department.model");
const Task = require("../models/task.model");
const User = require("../models/user.model");

const createDepartment = async (req, res) => {
  try {
    const { name } = req.body;

    const newDepartment = await Department.create({
      name
    });

    res.status(201).json({
      message: "Department created successfully",
      data: newDepartment
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

const getAllDepartments = async (req, res) => {
  try {
    const departments = await Department.find({
      isDelete: false
    })
      .populate({
        path: "users",
        select: "fullName email lastLogin",
        match: { isDelete: false, isActive: true }
      })
      .populate("tasks", "title status dueDate")
      .lean();
    res.status(200).json({
      message: "Departments fetched successfully",
      data: departments
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

const getSingleDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const department = await Department.findOne({
      _id: id,
      isDelete: false
    })
      .populate({
        path: "users",
        select: "fullName email lastLogin",
        match: { isDelete: false, isActive: true }
      })
      .populate("tasks", "title status dueDate")
      .lean();

    if (!department) {
      return res.status(404).json({ message: "Department not found" });
    }

    res.status(200).json({
      message: "Department fetched successfully",
      data: department
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

const editDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const updatedDepartment = await Department.findOneAndUpdate(
      { _id: id, isDelete: false },
      { name },
      { new: true }
    );

    if (!updatedDepartment) {
      return res.status(404).json({ message: "Department not found" });
    }

    res.status(200).json({
      message: "Department updated successfully",
      data: updatedDepartment
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

const changeStatus = async (req, res) => {
  try {
    const { id } = req.params;

    const department = await Department.findById(id);
    if (!department || department.isDelete) {
      return res.status(404).json({ message: "Department not found" });
    }
    department.isActive = !department.isActive;

    await User.updateMany(
      {
        departmentId: id
      },
      {
        $set: { isActive: !department.isActive }
      }
    )

    await Task.updateMany(
      {
        departmentId: id
      },
      {
        $set: { isActive: !department.isActive }
      }
    )
    await department.save();
    res.status(200).json({
      message: "Department status changed successfully",
      data: department
    });

  }
  catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

const deleteDepartment = async (req, res) => {
  try {
    const { id } = req.params;

    const department = await Department.findById(id);
    if (!department || department.isDelete) {
      return res.status(404).json({ message: "Department not found" });
    }

    department.isDelete = true;

    await User.updateMany(
      {
        departmentId: id
      },
      {
        $set: { isDelete: true }
      }
    )

    await Task.updateMany(
      {
        departmentId: id
      },
      {
        $set: { isDelete: true }
      }
    )

    await department.save();

    res.status(200).json({
      message: "Department deleted successfully",
      data: department
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

module.exports = {
  createDepartment,
  getAllDepartments,
  getSingleDepartment,
  editDepartment,
  changeStatus,
  deleteDepartment
};