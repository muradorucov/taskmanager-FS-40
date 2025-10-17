const Joi = require("joi");

const forgotSchema = Joi.object({
  email: Joi.string().email().max(100).min(5).required()
});

module.exports = forgotSchema