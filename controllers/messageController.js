let {Message, User} = require("../models");

const {
    getMessagesInfo,
    getTeacherPossibleRecipients,
    getStudentPossibleRecipients, createMessageService
} = require("../services/messagesService");

const {Op} = require("sequelize");
const {singleMessageResource} = require("../dtos/messageDto");

const createMessage = async (req, res, next) => {
    try {
        let message = await createMessageService(req.body.message, req.user.id, req.body.receiverId);
        res.json(await singleMessageResource(message));
    } catch (error) {
        next(error);
    }
}

const listBySenderAndReceiver = async (req, res) => {
    let senderId = req.user.id;
    let receiverId = req.params.id;
    try {
        let messages = await Message.findAll({
            where: {
                [Op.or]: [
                    {senderId: senderId, receiverId: receiverId},
                    {senderId: receiverId, receiverId: senderId},
                ]
            },
            order: [
                ['createdAt', 'ASC'],
            ],
            include: [{
                model: User,
                as: 'sender',
                attributes: ['name']
            }]
        });
        messages.forEach((message)=>{
            if(message.senderId !== senderId) {
                message.read = true;
                message.save();
            }
        })
        return res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({status: "Something went wrong"});
    }
}

const getMySentMessages = async (req, res) => {
    const messages = await req.user.getSentmessage();
    return res.status(200).json(messages);
}

const getMyReceivedMessages = async (req, res) => {
    let messages = [];
    messages = await getMessagesInfo(req.user);
    return res.status(200).json(messages);
}

const listPossibleRecipients = async (req, res) => {
    let recipients = []
    if (req.user.roleId === 1) {
        const teacher = await req.user.getTeacher();
        recipients = await getTeacherPossibleRecipients(teacher);
    } else if (req.user.roleId === 2) {
        const student = await req.user.getStudent();
        recipients = await getStudentPossibleRecipients(student);
    } else if (req.user.roleId === 3) {
        const parent = await req.user.getParent();
        const student = await parent.getStudent();
        recipients = await getStudentPossibleRecipients(student);
    }
    res.status(200).json(recipients);
}

const getNewMessagesCount= async (req,res)=>{
    const count = await req.user.getNumberOfNewMessages()
    res.json({count})
}

const createAnnouncement = async (req, res) => {
    let allRecords = []
    let receivers = req.body.receiverId
    for (let i = 0; i < receivers.length; i++) {
        let recordToInsert = {
            message: req.body.message,
            senderId: req.user.id,
            receiverId: receivers[i],
        }
        allRecords.push(recordToInsert);
    }
    console.log(allRecords)
    try {
        let message = await Message.bulkCreate(allRecords);
        console.log(message)
        return res.status(200).send(message);
    } catch (error) {
        res.status(500).send(error);
    }
}

const create = async (req, res) => {
    let receivers = req.body.receiverId
    if(Array.isArray(receivers)){
        await createAnnouncement(req,res)
    }else{
        await createMessage(req,res)
    }
}

module.exports = {
    create,
    listBySenderAndReceiver,
    getMySentMessages,
    getMyReceivedMessages,
    listPossibleRecipients,
    getNewMessagesCount,
    createMessage
}
