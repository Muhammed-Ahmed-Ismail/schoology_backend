let {Message} = require("../models")
const {messages} = require("../middleware/requestValidators/Auth/signupStudent")
const {getMessagesInfoAsTeacher} = require("../services/messagesService");
const {Op} = require("sequelize");

const create = async (req, res) => {

    let senderId = req.user.id // check ismail jwt
    console.log(req.user.id)
    try {
        let messagex = await Message.create({
            message: req.body.message,
            senderId: senderId, // check
            recieverId: req.body.recieverId,
        })
        return res.json(messagex)
    } catch (error) {
        res.send(error)
    }
}


const listBySenderAndReciever = async (req, res) => {

    let senderId = req.user.id  // check ismail jwt ( how to get sender id from request)

    try {
        let messages = await Message.findAll({
            where: {
                [Op.or]: [
                    {senderId: senderId, receiverId: req.params.id},
                    {senderId: req.params.id, receiverId: senderId},
                ]
            }
            ,
            order: [
                ['createdAt', 'ASC'],
            ],
        })
        console.log(messages)
        return res.json(messages)
    } catch (error) {
        res.send('"status":"Something went wrong"')
    }

}

const getMySentMessages = async (req, res) => {
    const messages = await req.user.getSentmessage()
    return res.json(messages)
}
const getMyReceivedMessages = async (req, res) => {
    let messages = []
    if (req.user.roleId === 1)
        messages = await getMessagesInfoAsTeacher(req.user)
    return res.json(messages)
}

module.exports = {
    create,
    listBySenderAndReciever,
    getMySentMessages,
    getMyReceivedMessages
}

