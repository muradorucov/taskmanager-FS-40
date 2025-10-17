const jwt = require("jsonwebtoken");
const config = require("../config");
const User = require("../models/user.model");

const authenticate = async (req, res, next) => {
  try {
    const { accessToken } = req.cookies;
    if (!accessToken) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const decoded = jwt.verify(accessToken, config.access_secret);
    const user = await User.findOne({
      _id: decoded.userId,
      isDelete: false,
      isActive: true,
      isVerified: true
    }).populate([
      {
        path: "departmentId",
        select: "name isActive",
      }, {
        path: "tasks",
        select: "title status",
      }]).lean()
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized", error: error.message });
  }
}
module.exports = authenticate;