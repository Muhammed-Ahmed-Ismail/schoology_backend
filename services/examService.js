let {Exam, StudentExam, Student, User, Class, Course, Teacher} = require("../models")
const {sendNotificationToClass} = require("./Notifications");

const notifyUsersByExamUpdate = async (exam,adminId)=>{
    const classRoom = await exam.getClass()
    await sendNotificationToClass(adminId,classRoom.id,`${exam.name}  exam date has been changed check it`)
}

const notifyUsersByExamDeletion = async (exam,adminId)=>{
    const classRoom = await exam.getClass()
    await sendNotificationToClass(adminId,classRoom.id,`${exam.name} exam has been canceled`)
}

module.exports={
    notifyUsersByExamUpdate,
    notifyUsersByExamDeletion
}