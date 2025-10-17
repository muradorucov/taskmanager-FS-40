const Joi = require("joi");

const resetSchema = Joi.object({
  newPassword: Joi.string().min(6).max(100).required()
});

module.exports = resetSchema