const signupStudentValidationSchema = require("./signupStudent")
const signupTeacherValidationSchema = require("./signupTeacher")
const signupParentValidationSchema = require("./signupParent")
const loginValidationSchema = require("./login")


const validateSignupStudentRequest = async (req, res, next) => {

    try {
        await signupStudentValidationSchema.validateAsync(req.body, {
            abortEarly: false
        })
        next()
    } catch (error) {
        error.status = 400
        next(error)
    }
}
const validateSignupParentRequest = async (req, res, next) => {

    try {
        await signupParentValidationSchema.validateAsync(req.body, {
            abortEarly: false
        })
        next()
    } catch (error) {
        error.status = 400
        next(error)
    }
}
const validateSignupTeacherRequest = async (req, res, next) => {

    try {
        await signupTeacherValidationSchema.validateAsync(req.body, {
            abortEarly: false
        })
        next()
    } catch (error) {
        error.status = 400
        next(error)
    }
}

const validateLoginRequest = async (req,res,next)=>{
    try {
        await loginValidationSchema.validateAsync(req.body, {
            abortEarly: false
        })
        next()
    } catch (error) {
        error.status = 400
        next(error)
    }

}

module.exports = {
    validateSignupTeacherRequest,
    validateSignupStudentRequest,
    validateSignupParentRequest,
    validateLoginRequest
}