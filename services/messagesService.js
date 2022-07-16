const {User, Teacher, Student, Parent, Message} = require("../models")
const {getMessageInfoResourceForTeacher, getTeacherRecipientsResource, getStudentParentsRecipientsResource} = require("../dtos/messageDto");

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
        let data = await getTeacherRecipientsResource(classRoom)
        students = students.concat(data)
    }
    return students
}
const getStudentPossibleRecipients = async (student) => {
    const classRoom = await student.getClass()
    let teachers = await getStudentParentsRecipientsResource(classRoom)
    return teachers
}
module.exports = {
    getMessagesInfoAsTeacher,
    getTeacherPossibleRecipients,
    getStudentPossibleRecipients
}