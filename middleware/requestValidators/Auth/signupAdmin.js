const Joi = require("joi")

//sign up validation
const signupAdminValidationSchema = Joi.object({
    name: Joi.string().min(3).required(),
    phone: Joi.string().regex(/^\d{3}-\d{4}-\d{4}$/).required(),
    password: Joi.string().required(),
    confirmPassword: Joi.string().required().valid(Joi.ref('password')),
    roleId: Joi.number().required(),
    email:Joi.string().email().required(),
});

module.exports = signupAdminValidationSchema
