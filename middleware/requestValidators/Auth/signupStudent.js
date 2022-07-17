const Joi = require("joi");

// Sign up validation
const signupStudentValidationSchema = Joi.object({
    name: Joi.string().min(3).required(),
    phone: Joi.string().regex(/^\d{11}$/).required(),
    password: Joi.string().required(),
    confirmPassword: Joi.string().required().valid(Joi.ref('password')),
    roleId: Joi.number().required(),
    // courseId: Joi.number().required(),
    classId:Joi.number().required(),
    gender: Joi.valid('male', 'female').required(),
    birth_date: Joi.date(),
    email:Joi.string().email().required()

    // studentId:Joi.number(),
});

module.exports = signupStudentValidationSchema