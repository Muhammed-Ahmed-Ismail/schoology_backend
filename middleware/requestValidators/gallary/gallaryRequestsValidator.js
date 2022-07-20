const Joi = require('joi')

const addImageRequestSchema = Joi.object().keys({
    title: Joi.string().required(),
    link: Joi.string().required(),
    description: Joi.string().required(),
    id:Joi.number()
});
const removeImageRequestSchema = Joi.object().keys({
    imageId: Joi.number().required(),
});


const validateAddImage = async (req, res, next) => {

    try {
        await addImageRequestSchema.validateAsync(req.body, {
            abortEarly: false
        })
        console.log('valid')
        next()
    } catch (error) {
        console.log(error)
        error.status = 400
        next(error)
    }
}

const validateRemoveImage = async (req, res, next) => {

    try {
        await removeImageRequestSchema.validateAsync(req.body, {
            abortEarly: false
        })
        console.log('valid')
        next()
    } catch (error) {
        console.log(error)
        error.status = 400
        next(error)
    }
}


module.exports = {
    validateAddImage,
    validateRemoveImage
}