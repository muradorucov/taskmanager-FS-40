const { default: mongoose } = require("mongoose");

const taskSchema = mongoose.Schema(
  {
    title: {
      type: String,
      maxLength: 300,
      required: true
    },
    description: {
      type: String,
      maxLength: 500,
      required: true
    },
    departmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department"
    },
    status: {
      type: String,
      enum: ["pending", "in-progress", "in-review", "completed"],
      default: "pending"
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    dueDate: {
      type: Date,
      default: null
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    isActive: {
      type: Boolean,
      default: true
    },
    isDelete: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;