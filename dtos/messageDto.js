const {User, Parent, Class, Student,Course} = require("../models");


const getMessageInfoResourceForTeacher = async (message) => {
    let messageInfo = {
        senderName: message.sender.name,
        senderId: message.sender.id,
        date: message.createdAt,
    }
    const sender = await message.getSender()
    if (message.sender.roleId === 2) {
        let student = await sender.getStudent()
        let classRoom = await student.getClass()
        messageInfo['class'] = classRoom.name
        messageInfo['senderType'] = 'student'
    } else if (message.sender.roleId === 3) {
        let parent = await sender.getParent()
        let student = await parent.getStudent()
        let classRoom = await student.getClass()
        messageInfo['class'] = classRoom.name
        messageInfo['senderType'] = 'parent'
    }
    return messageInfo
}

const getMessagesInfoForStudentParent = async (message) => {
    let messageInfo = {
        senderName: message.sender.name,
        senderId: message.sender.id,
        date: message.createdAt,

    }
    const sender = await message.getSender()
    const teacher = await sender.getTeacher()
    console.log(teacher)
    const course = await teacher.getCourse()
    messageInfo['course'] = course.name
    return messageInfo
}

const singleMessageResource = async (message) => {
    let messageResource = {}
    let sender = await message.getSender()
    messageResource['senderId'] = message.senderId
    messageResource['receiverId'] = message.receiverId
    messageResource['message'] = message.message
    messageResource['sender'] = {name: sender.name}
    return messageResource
}

const getTeacherRecipientsResource = async (classRoom) => {
    // console.log('class',classRoom)
    const studentsResources = []
    let students = await classRoom.getStudents({
        include: [{
            model: User,
            as: 'user',
            attributes: ['id', 'name']
        }, {
            model: Parent,
            as: 'parent',
            include: [{
                model: User,
                as: 'user',
                attributes: ['id', 'name']
            }],

        }
        ],
    })

    for (const student of students) {
        let data = {
            studentId: student.user.id,
            studentName: student.user.name,
            parentName: student.parent.user.name,
            parentId: student.parent.user.id,
            className: classRoom.name
        }
        studentsResources.push(data)

    }
    return studentsResources
}

const getStudentParentsRecipientsResource = async (classRoom) => {
    const teachersResources = []
    const teachers = await classRoom.getTeachers({
        include: [{
            model: User,
            as: 'user',
            attributes: ['id', 'name']
        },
            {
                model: Course,
                as:'course',
                attributes: ['name']
            }
        ]
    })

    for (const teacher of teachers) {
        teachersResources.push({
            teacherId: teacher.user.id,
            teacherName: teacher.user.name,
            course:teacher.course.name
        })
    }
    return teachersResources
}
module.exports = {
    getMessageInfoResourceForTeacher,
    getTeacherRecipientsResource,
    getMessagesInfoForStudentParent,
    getStudentParentsRecipientsResource,
    singleMessageResource
}