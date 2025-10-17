const Joi = require("joi");

const departmentSchema = Joi.object({
  name: Joi.string().max(100).min(2).required(),
});

module.exports = departmentSchema