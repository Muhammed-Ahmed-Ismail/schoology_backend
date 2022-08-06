const Joi = require('joi')

const createAnnouncementSchema = Joi.object().keys({
    announcement: Joi.string().required(),
    image: Joi.string(),
});

const validateCreateAnnouncementRequest = async (req, res, next) => {
    try {
        await createAnnouncementSchema.validateAsync(req.body, {
            abortEarly: false
        })
        next()
    } catch (error) {
        error.status = 400
        next(error)
    }
}


module.exports = {validateCreateAnnouncementRequest}
