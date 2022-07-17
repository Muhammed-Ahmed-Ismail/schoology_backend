const jwt = require("jsonwebtoken");
const teacherDto = require("../dtos/teacherDto")
require("dotenv").config();
const fs = require('fs')
const PRIVAREKEY = fs.readFileSync(process.env.PRIVATEKEYPATH, 'utf8')
const getjwtToken = (user) => {
    // console.log(jwtSecretKey);
    console.log('in webtoken');
    let data = {
        time: Date(),
        userId: user.id,
        iat: Date.now()
    }
    const token = jwt.sign(data, PRIVAREKEY, {algorithm: 'RS256'});
    console.log(token);
    return token

}

const logInTeacher = async (teacher) => {
    const user = await teacher.getUser()
    const token = getjwtToken(user)
    const countOfNewMessages = await user.getNumberOfNewMessages()
    const classes = await teacher.getClasses()
    const course = await teacher.getCourse()

    const response = {
        userId: teacher.id,
        userName: user.name,
        userType: "teacher",
        courseId: teacher.courseId,
        personId: user.id,
        newMessagesCount:countOfNewMessages,
        course,
        classes,
        token
    }
    return teacherDto.picTeacherResource(response)

}

const logInStudent = async (student) => {
    const user = await student.getUser()
    const token = getjwtToken(user)
    const classRoom = await student.getClass()
    const countOfNewMessages = await user.getNumberOfNewMessages()

    const response = {
        userId: student.id,
        userName: user.name,
        personId: user.id,
        userType: "student",
        classId: classRoom.id,
        className: classRoom.name,
        newMessagesCount:countOfNewMessages,

        token
    }
    return response

}
const logInParent = async (parent) => {
    const user = await parent.getUser()
    const token = getjwtToken(user)
    const student = await parent.getStudent()
    const countOfNewMessages = await user.getNumberOfNewMessages()

    const response = {
        userId: parent.id,
        userName: user.name,
        personId: user.id,
        userType: "parent",
        studentId: student.id,
        newMessagesCount:countOfNewMessages,

        token
    }
    return response
}

module.exports = {
    logInTeacher,
    logInStudent,
    logInParent
}