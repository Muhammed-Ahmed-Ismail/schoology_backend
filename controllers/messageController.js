let { Message } = require("../models")
const { messages } = require("../middleware/requestValidators/Auth/signupStudent")

const create = async (req, res) => {

    let senderId = req.user // check ismail jwt
    try {
        let messagex = await Message.create({
            message: req.body.message,
            senderId: senderId, // check
            recieverId: req.body.reciever,
        })
        return res.json(messagex)
    } catch (error) {
        res.send(error)
    }
}


const listBySenderAndReciever = async (req, res) => {

    let senderId = req.user // check ismail jwt ( how to get sender id from request)

    try {
        let messages = await Message.findAll({
                where: { senderId: senderId , recieverId: req.params.id}
                ,
                order: [
                    ['createdAt', 'ASC'],
                ],
            }) 
        return res.json(messages)
        } 

    catch (error) {
        res.send('"status":"Something went wrong"')
    }

}

module.exports = { create , listBySenderAndReciever }