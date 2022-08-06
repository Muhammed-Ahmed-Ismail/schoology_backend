const {User, Message} = require("../models");
const {
    getMessageInfoResourceForTeacher,
    getTeacherRecipientsResource,
    getMessagesInfoForStudentParent,
    getStudentParentsRecipientsResource
} = require("../dtos/messageDto");

const createMessageService = async (body, senderId, receiverId) => {
    try {
        let message = await Message.create({
            message: body,
            senderId: senderId,
            receiverId: receiverId,
        });
        return message;
    }catch (error) {
        throw error;
    }
}

const getMessagesInfo = async (user) => {
    try {
        let messages = await user.getReceivedmessage({
            where:{read:false},
            include: [{
                model: User,
                as: 'sender',
                attributes: ['name', 'roleId', 'id'],
            }]
        })
        let messagesWithInfo = [];
        let senders = new Set();
        if (user.roleId === 1) {
            for (let message of messages) {
                if (!senders.has(message.sender.id)) {
                    senders.add(message.sender.id);
                    let messageInfo = await getMessageInfoResourceForTeacher(message);
                    messagesWithInfo.push(messageInfo);
                }
            }
        } else if (user.roleId === 2 || user.roleId === 3) {
            for (let message of messages) {
                if (!senders.has(message.sender.id)) {
                    senders.add(message.sender.id);
                    let messageInfo = await getMessagesInfoForStudentParent(message);
                    messagesWithInfo.push(messageInfo);
                }
            }
        }
        return messagesWithInfo;
    }catch (error) {
        throw error;
    }
}

const getMessageInfoForStudentParent = async (user) => {
    let messages = await user.getReceivedmessage({
        include: [{
            model: User,
            as: 'sender',
            attributes: ['name', 'roleId', 'id'],
        }]
    });
}

const getTeacherPossibleRecipients = async (teacher) => {
    let students = [];
    const classes = await teacher.getClasses();
    for (const classRoom of classes) {
        let data = await getTeacherRecipientsResource(classRoom);
        students = students.concat(data);
    }
    return students;
}

const getStudentPossibleRecipients = async (student) => {
    const classRoom = await student.getClass();
    let teachers = await getStudentParentsRecipientsResource(classRoom);
    return teachers;
}

module.exports = {
    createMessageService,
    getMessagesInfo,
    getTeacherPossibleRecipients,
    getStudentPossibleRecipients
}
