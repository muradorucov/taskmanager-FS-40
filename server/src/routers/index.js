const express = require("express");
const authRouter = require("./auth.router");
const userRouter = require("./user.router");
const taskRouter = require("./task.router");
const departmentRouter = require("./department.router");
const routers = express.Router();


routers.use("/auth", authRouter);
routers.use("/user", userRouter);
routers.use("/task", taskRouter);
routers.use("/department", departmentRouter);


module.exports = routers