const { response } = require("express");
const res = require("express/lib/response");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const getjwtToken = (user)=>{

    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    console.log(process.env.JWT_SECRET_KEY)
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
    console.log(response)

    return response

}

module.exports = {
    logInTeacher
}