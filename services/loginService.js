
const jwt = require("jsonwebtoken");
const teacherDto = require("../dtos/teacherDto")
require("dotenv").config();

const getjwtToken = (user)=>{

    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    let data = {
      time: Date(),
      userId: user.id,
    }
    return token = jwt.sign(data, jwtSecretKey);
    
}

const logInTeacher = async (teacher)=>{
    const token = getjwtToken( await teacher.getUser())
    const classes = await teacher.getClasses()
    console.log(classes)
    const course = await teacher.getCourse()
    const response = {
        userId:teacher.id,
        course,
        classes,
        token
    }
    return teacherDto.picTeacherResource(response)

}

module.exports = {
    logInTeacher
}