const Joi = require("joi");

// Sign up validation
const signupValidationSchema = Joi.object({
  name: Joi.string().min(3).required(),
  phone: Joi.string().regex(/^\d{3}-\d{4}-\d{4}$/).required(),
  password: Joi.string().required(),
  confirmPassword: Joi.string().required().valid(Joi.ref('password')),
  roleId: Joi.number().required(),
  // userId: Joi.number().required(),
  courseId: Joi.number(),
  gender: Joi.valid('male', 'female'),
  birth_date: Joi.date(),
  studentId:Joi.number(),
});

// Login validation
const loginValidationSchema = Joi.object({
  phone: Joi.string().regex(/^\d{3}-\d{4}-\d{4}$/).required(),
  password: Joi.string().required(),
});

module.exports = {
  signupValidationSchema,
  loginValidationSchema,
};