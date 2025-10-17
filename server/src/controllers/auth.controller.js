const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config");
const sendMail = require("../utils/resetPassMail");
const Token = require("../models/token.model");
const { logger } = require("../utils/logger");
const resetPasswordTemplate = require("../templates/reset.template");
const verifyAccountTemplate = require("../templates/verify.template");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("test", req.body);


    const user = await User.findOne({
      email,
      isDelete: false,
      isActive: true,
      isVerified: true
    })
      .select("+password");


    if (!user) {
      logger.warn(`Failed login attempt for email: ${email} IP: ${req.ip}`);
      return res.status(401).json({ message: "Invalid email or password" });
    }


    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      logger.warn(`Failed login attempt for email: ${email} IP: ${req.ip}`);
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const accessToken = jwt.sign(
      {
        userId: user._id
      },
      config.access_secret,
      {
        expiresIn: "1h",
      }
    );
    user.lastLogin = new Date();
    await user.save();


    res.cookie(
      "accessToken",
      accessToken,
      {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 3600000, // 1 hour
      });

    logger.info(`User logged in: ${email} IP: ${req.ip}`);
    res.status(200).json({
      message: "Login successful"
    });
  } catch (error) {
    logger.error(`Login error: ${error.message} IP: ${req.ip}`);
    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
}

const logout = (req, res) => {
  try {
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
    res.status(200).json({
      message: "Logout successful"
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
}

const currentUser = (req, res) => {
  try {
    const user = req.user
    res.status(200).json({
      message: "Current user fetched successfully",
      user
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
}

const forgotPassword = async (req, res) => {
  try {

    const { email } = req.body;

    const founduser = await User.findOne({
      email,
      isDelete: false,
      isActive: true,
      isVerified: true
    });
    if (!founduser) {
      return res.status(404).json({ message: "User not found" });
    }
    const resetToken = jwt.sign(
      {
        userId: founduser._id
      },
      config.reset_secret,
      {
        expiresIn: "15m"
      }
    );

    await Token.create({
      userId: founduser._id,
      token: resetToken
    })



    const resetLink = `http://localhost:5173/reset-pass?token=${resetToken}`;

    await sendMail(founduser.email, "Reset Password", resetPasswordTemplate({ fullName: founduser.fullName, resetLink }));

    res.status(200).json({
      message: "Reset password email sent"
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
}

const resetPassword = async (req, res) => {
  try {
    const { token } = req.query;
    const { newPassword } = req.body;
    if (!token) {
      return res.status(400).json({ message: "Token is required" });
    }

    const decoded = jwt.verify(token, config.reset_secret);
    if (!decoded) {
      return res.status(400).json({ message: "Invalid token" });
    }
    const { userId } = decoded;

    const tokenDoc = await Token.findOne({ userId, token, isValid: true });
    if (!tokenDoc) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }



    const user = await User.findOne({
      _id: userId,
      isDelete: false,
      isActive: true,
      isVerified: true
    }).select("+password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(newPassword, user.password);
    if (isMatch) {
      return res.status(400).json({
        message: "New password must be different from the old password"
      });
    }


    user.password = await bcrypt.hash(newPassword, 10);
    tokenDoc.isValid = false;
    await tokenDoc.save();
    await user.save();

    res.status(200).json({
      message: "Password reset successful"
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
}

const tokenVerify = async (req, res) => {
  try {
    const { token } = req.query;
    if (!token) {
      return res.status(400).json({ message: "Token is required" });
    }
    const decoded = jwt.verify(token, config.reset_secret);
    if (!decoded) {
      return res.status(400).json({ message: "Invalid token" });
    }
    const { userId } = decoded;

    const tokenDoc = await Token.findOne({ userId, token, isValid: true });
    if (!tokenDoc) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    res.status(200).json({
      message: "Token is valid"
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
}

const verifyAccount = async (req, res) => {
  try {
    const { token } = req.query;
    if (!token) {
      return res.status(400).json({ message: "Token is required" });
    }
    const decoded = jwt.verify(token, config.reset_secret);
    if (!decoded) {
      return res.status(400).json({ message: "Invalid token" });
    }
    const { userId } = decoded;
    const tokenDoc = await Token.findOne({ userId, token, isValid: true });
    if (!tokenDoc) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    const user = await User.findOne({
      _id: userId,
      isDelete: false,
      isActive: true,
      isVerified: false
    });

    if (!user) {
      return res.status(404).json({
        message: "User Not Found"
      })
    }

    user.isVerified = true;
    tokenDoc.isValid = false;
    await user.save();
    await tokenDoc.save()

    res.status(200).json({
      message: "Account is success Verified"
    })


  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
}

const resendVerifyEmail = async (req, res) => {
  try {
    const { email } = req.body;

    const foundUser = await User.findOne({
      email,
      isActive: true,
      isDelete: false,
      isVerified: false
    });
    if (!foundUser) {
      return res.status(400).json({ message: "User NotFound" });
    }



    const verifyToken = jwt.sign(
      {
        userId: foundUser._id
      },
      config.reset_secret,
      {
        expiresIn: "15m"
      }
    );

    await Token.create({
      userId: foundUser._id,
      token: verifyToken
    })

    const verifyLink = `http://localhost:5173/verify-account?token=${verifyToken}`;

    await sendMail(
      email,
      "Account Verify",
      verifyAccountTemplate({ fullName: foundUser.fullName, verifyLink })
    );


    res.status(201).json({
      message: "Sent Mail successfully",
    })

  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message })
  }
}


module.exports = {
  login,
  logout,
  currentUser,
  forgotPassword,
  resetPassword,
  tokenVerify,
  resendVerifyEmail,
  verifyAccount
}