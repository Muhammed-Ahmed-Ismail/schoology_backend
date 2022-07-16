const {User, Teacher, Student, Parent, Message} = require("../models")
const {getMessageInfoResourceForTeacher} = require("../dtos/messageDto");

const getMessagesInfoAsTeacher = async (user) => {
    let messages = await user.getReceivedmessage({
        include: [{
            model: User,
            as: 'sender',
            attributes: ['name', 'roleId','id'],
        }]
    })
    let messagesWithInfo = []
    for (let message of messages) {
       let messageInfo =await getMessageInfoResourceForTeacher(message)
        messagesWithInfo.push(messageInfo)
    }
    return messagesWithInfo
}


module.exports = {
    getMessagesInfoAsTeacher
}