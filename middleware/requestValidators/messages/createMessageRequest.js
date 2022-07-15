const Joi = require('joi')

const createMessageSchema = Joi.object().keys({
    message: Joi.string().required(),
    recieverId: Joi.alternatives().try(Joi.array(), Joi.number()).required(),
    
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