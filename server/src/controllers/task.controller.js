const Department = require("../models/department.model");
const Task = require("../models/task.model");
const User = require("../models/user.model");

const createTask = async (req, res) => {
  try {

    const { title, description, assignedTo, dueDate, departmentId } = req.body;

    const task = new Task({
      title,
      description,
      status: "pending",
      assignedTo,
      dueDate,
      createdBy: req.user._id,
      departmentId
    });
    await task.save();


    const user = await User.findById(assignedTo);
    user.tasks.push(task._id);
    await user.save();

    const department = await Department.findById(user.departmentId);
    department.tasks.push(task._id);
    await department.save();

    res.status(201).json({
      message: "Task created successfully",
      task
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
}

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ isDelete: false })
      .populate("assignedTo", "fullName email")
      .populate("createdBy", "fullName email");
    res.status(200).json({ message: "Tasks fetched successfully", data: tasks });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
}

const changeProgress = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ["pending", "in-progress", "in-review", "completed"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }


    if (req.user.role === "admin") {
      task.status = status;
      await task.save();
      return res.status(200).json({
        message: "Task status updated successfully",
        task
      });
    }

    const isTask = req.user.tasks.some((task) => task._id.toString() === id)

    if (!isTask) {
      return res.status(401).json({
        message: "Not Your Task!"
      })
    }


    if (status === "in-progress" || status === "in-review") {
      task.status = status;
    } else {
      return res.status(403).json({ message: "Forbidden" });
    }

    await task.save();

    res.status(200).json({
      message: "Task status updated successfully",
      task
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
}

const editTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, assignedTo, dueDate, departmentId } = req.body;

    const task = await Task.findById(id);

    if (!task || task.isDelete) {
      return res.status(404).json({ message: "Task not found" });
    }
    task.title = title || task.title;
    task.description = description || task.description;
    task.assignedTo = assignedTo || task.assignedTo;
    task.dueDate = dueDate || task.dueDate;
    task.departmentId = departmentId || task.departmentId;
    await task.save();

    res.status(200).json({
      message: "Task updated successfully",
      task
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
}

const getSingleTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id)
      .populate("assignedTo", "fullName email")
      .populate("createdBy", "fullName email");



    if (!task || task.isDelete) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (req.user.role === "admin") {
      return res.status(200).json({
        message: "Task fetched successfully",
        data: task
      });
    }

    const isTask = req.user.tasks.some((task) => task._id.toString() === id)

    if (!isTask) {
      return res.status(401).json({
        message: "Not Your Task!"
      })
    }

    res.status(200).json({
      message: "Task fetched successfully",
      data: task
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

const changeStatus = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findById(id);
    if (!task || task.isDelete) {
      return res.status(404).json({ message: "Task not found" });
    }
    task.isActive = !task.isActive;
    await task.save();
    res.status(200).json({
      message: "Task status changed successfully",
      data: task
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);
    if (!task || task.isDelete) {
      return res.status(404).json({ message: "Task not found" });
    }
    task.isDelete = true;
    await task.save();
    res.status(200).json({
      message: "Task deleted successfully",
      data: task
    });
  }
  catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

module.exports = {
  createTask,
  changeProgress,
  getAllTasks,
  editTask,
  changeStatus,
  deleteTask,
  getSingleTask
};