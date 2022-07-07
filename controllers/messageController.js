let { Message } = require("../models")
const { messages } = require("../middleware/requestValidators/Auth/signupStudent")

const create = async (req, res) => {

    let sender = req.user // check ismail jwt
    try {
        let messagex = await Message.create({
            message: req.body.message,
            senderId: sender, // check
            recieverId: req.body.reciever,
        })
        return res.json(messagex)
    } catch (error) {
        res.send(error)
    }
}


const listBySenderAndReciever = async (req, res) => {

    let sender = req.user // check ismail jwt

    try {
       let messages = await Message.findAll({where: { senderId: sender , recieverId: req.params.id}}) 
       return res.json(messages)
        } 

    catch (error) {
        res.send('"status":"Something went wrong"')
    }

}

module.exports = { create , listBySenderAndReciever }