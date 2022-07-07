const jwt = require("jsonwebtoken");
const teacherDto = require("../dtos/teacherDto")
require("dotenv").config();
const fs = require('fs')
const PRIVAREKEY=fs.readFileSync(process.env.PRIVATEKEYPATH,'utf8')
const getjwtToken = (user)=>{
    // console.log(jwtSecretKey);
    console.log('in webtoken');
    let data = {
      time: Date(),
      userId: user.id,
      iat: Date.now()
    }
   const token =jwt.sign(data, PRIVAREKEY,{ algorithm: 'RS256' });
     console.log(token);
     return token
    
}

const logInTeacher = async (teacher)=>{
    const user = await teacher.getUser()
    const token = getjwtToken(user)
    const classes = await teacher.getClasses()
    console.log(classes)
    const course = await teacher.getCourse()
    const response = {
        userId:teacher.id,
        userName:user.name,
        userType: "teacher",
        course,
        classes,
        token
    }
    return teacherDto.picTeacherResource(response)

}

module.exports = {
    logInTeacher
}