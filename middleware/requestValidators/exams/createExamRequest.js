const Joi = require('joi')

const createExamSchema = Joi.object().keys({
    name: Joi.string().required(),
    link: Joi.string().required(),
    date: Joi.date().iso().required(),
    teacherId: Joi.number().required(),
    classId: Joi.number().required(),
    courseId: Joi.number().required(),

    

});

const validateExamRequest = async (req, res, next) => {

    try {
        await createExamSchema.validateAsync(req.body, {
            abortEarly: false
        })
        next()
    } catch (error) {
        error.status = 400
        next(error)
    }
}


module.exports = {validateExamRequest}