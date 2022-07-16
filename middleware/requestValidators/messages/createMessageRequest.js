const Joi = require('joi')

const createMessageSchema = Joi.object().keys({
    message: Joi.string().required(),
    // senderId: Joi.number().required(), not needed as its aquired from jwt
    receiverId: Joi.number().required(),
});

const validateCreateMessageRequest = async (req, res, next) => {

    try {
        await createMessageSchema.validateAsync(req.body, {
            abortEarly: false
        })
        next()
    } catch (error) {
        error.status = 400
        next(error)
    }
}


module.exports = {validateCreateMessageRequest}