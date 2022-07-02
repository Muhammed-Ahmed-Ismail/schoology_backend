const Joi = require('joi')
// const {next} = require('express')
const createMeetingSchema = Joi.object().keys({
    name: Joi.string().required(),
    code: Joi.string().required(),
    date_time: Joi.date().iso().required(),
    teacherId: Joi.number().required(),
    classId: Joi.number().required(),
    courseId: Joi.number().required(),
    description: Joi.string().required(),
    period: Joi.number().required()
});

const validateCreateMeetingRequest = async (req, res, next) => {

    try {
        await createMeetingSchema.validateAsync(req.body, {
            abortEarly: false
        })
        next()
    } catch (error) {
        error.status = 400
        next(error)
    }
}


module.exports = {validateCreateMeetingRequest}