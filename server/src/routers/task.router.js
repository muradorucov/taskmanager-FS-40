const express = require("express");
const { createTask, changeStatus, getAllTasks, editTask, deleteTask, changeProgress, getSingleTask } = require("../controllers/task.controller");
const authenticate = require("../middleware/authenticate");
const checkRole = require("../middleware/authorisation");
const validate = require("../middleware/validation");
const taskSchema = require("../validations/task.schema");

const taskRouter = express.Router();


taskRouter.get("/", authenticate, checkRole, getAllTasks);
taskRouter.post("/create", authenticate, checkRole, validate(taskSchema), createTask);
taskRouter.patch("/:id/progress", authenticate, changeProgress);//X
taskRouter.put("/:id", authenticate, checkRole, validate(taskSchema), editTask);
taskRouter.get("/:id", authenticate, getSingleTask); //X
taskRouter.patch("/:id", authenticate, checkRole, changeStatus);
taskRouter.delete("/:id", authenticate, checkRole, deleteTask);


module.exports = taskRouter