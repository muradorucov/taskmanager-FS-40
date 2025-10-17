const Joi = require("joi");


const objectIdPattern = /^[0-9a-fA-F]{24}$/;
const userSchema = Joi.object({
  fullName: Joi.string().max(50).min(2).required(),
  email: Joi.string().email().max(100).min(5).required(),
  password: Joi.string().min(8).max(100).required(),
  role: Joi.string().valid("admin", "user").required(),
  departmentId: Joi.alternatives().conditional("role", {
    is: "admin",
    then: Joi.valid(null).optional(),
    otherwise: Joi.string()
      .pattern(objectIdPattern)
      .required()
  })
});

module.exports = userSchema