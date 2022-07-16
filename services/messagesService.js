const {User, Teacher, Student, Parent, Message} = require("../models")
const {getMessageInfoResourceForTeacher, getTeacherRecipientsResource} = require("../dtos/messageDto");

const getMessagesInfoAsTeacher = async (user) => {
    let messages = await user.getReceivedmessage({
        include: [{
            model: User,
            as: 'sender',
            attributes: ['name', 'roleId', 'id'],
        }]
    })
    let messagesWithInfo = []
    for (let message of messages) {
        let messageInfo = await getMessageInfoResourceForTeacher(message)
        messagesWithInfo.push(messageInfo)
    }
    return messagesWithInfo
}

const getTeacherPossibleRecipients = async (teacher) => {
    let students = []
    const classes = await teacher.getClasses()
    for (const classRoom of classes) {
        console.log(classRoom.name)
        let data =await getTeacherRecipientsResource(classRoom)

        students= students.concat(data)
    }
    return students
}
module.exports = {
    getMessagesInfoAsTeacher,
    getTeacherPossibleRecipients
}