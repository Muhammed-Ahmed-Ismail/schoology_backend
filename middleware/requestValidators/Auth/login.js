const Joi = require("joi");

const loginValidationSchema = Joi.object({
    phone: Joi.string().regex(/^\d{3}-\d{4}-\d{4}$/).required(),
    password: Joi.string().required(),
  });

  module.exports = loginValidationSchema