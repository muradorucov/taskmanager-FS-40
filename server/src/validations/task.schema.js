const Joi = require("joi");

const objectIdPattern = /^[0-9a-fA-F]{24}$/;
const taskSchema = Joi.object({
  title: Joi.string().max(100).min(2).required(),
  description: Joi.string().max(500).min(5).required(),
  assignedTo: Joi.string().pattern(objectIdPattern).required(),
  departmentId: Joi.string().pattern(objectIdPattern).required(),
  dueDate: Joi.date().greater("now").required()
});

module.exports = taskSchema