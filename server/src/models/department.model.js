const { default: mongoose } = require("mongoose");

const departmentSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxLength: 100
  },
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ],
  tasks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task"
    }
  ],
  isActive: {
    type: Boolean,
    default: true
  },
  isDelete: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

const Department = mongoose.model("Department", departmentSchema);

module.exports = Department;
