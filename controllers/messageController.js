let {Message, User, Class} = require("../models")
const {messages} = require("../middleware/requestValidators/Auth/signupStudent")
const {
    getMessagesInfo,
    getTeacherPossibleRecipients,
    getStudentPossibleRecipients
} = require("../services/messagesService");
const {Op} = require("sequelize");
const {singleMessageResource} = require("../dtos/messageDto");

const createMessage = async (req, res) => {

    let senderId = req.user.id // check ismail jwt
    console.log(req.user.id)
    try {
        let messagex = await Message.create({
            message: req.body.message,
            senderId: senderId, // check
            receiverId: req.body.receiverId,
        })
        res.json(await singleMessageResource(messagex))
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
            include: [{
                model: User,
                as: 'sender',
                attributes: ['name']

            }]
        })
        // console.log(messages)
        messages.forEach((message)=>{
            if(message.senderId != req.user.id) {
                message.read = true
                message.save()
            }
        })
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
    messages = await getMessagesInfo(req.user)
    return res.json(messages)
}


const listPossibleRecipients = async (req, res) => {
    let recipients = []
    if (req.user.roleId === 1) {
        const teacher = await req.user.getTeacher()
        recipients = await getTeacherPossibleRecipients(teacher)
    } else if (req.user.roleId === 2) {
        const student = await req.user.getStudent()
        recipients = await getStudentPossibleRecipients(student)
    } else if (req.user.roleId === 3) {
        const parent = await req.user.getParent()
        const student = await parent.getStudent()
        recipients = await getStudentPossibleRecipients(student)
    }

    res.json(recipients)
}

const getNewMessagesCount= async (req,res)=>{
    const count = await req.user.getNumberOfNewMessages()
    res.json({count})
}

const createAnnouncment = async (req, res) => {
    let allRecords = []
    let recievers = req.body.recieverId
    for (let i = 0; i < recievers.length; i++) {
        let recordToInsert = {
            message: req.body.message,
            senderId: req.user.id,
            recieverId: recievers[i],
        }
        allRecords.push(recordToInsert)
    }
    console.log(allRecords)
    try {
        let messagex = await Message.bulkCreate(
            allRecords
        )
        console.log(messagex)
        return res.send(messagex)
    } catch (error) {
        res.send(error)
    }
}

const create = async (req, res) => {
    let recievers = req.body.recieverId
    if(Array.isArray(recievers)){
        createAnnouncment(req,res)
    }else{
        createMessage(req,res)
    }
}


module.exports = {
    create,
    listBySenderAndReciever,
    getMySentMessages,
    getMyReceivedMessages,
    listPossibleRecipients,
    getNewMessagesCount,
    createMessage
}