const Joi = require('joi')

const createAnnouncmentSchema = Joi.object().keys({
    announcment: Joi.string().required(),
    image: Joi.string(),
    
});

const validateCreateAnnouncmentRequest = async (req, res, next) => {

    try {
        await createAnnouncmentSchema.validateAsync(req.body, {
            abortEarly: false
        })
        next()
    } catch (error) {
        error.status = 400
        next(error)
    }
}


module.exports = {validateCreateAnnouncmentRequest}