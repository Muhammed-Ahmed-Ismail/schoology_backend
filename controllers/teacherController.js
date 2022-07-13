let { Teacher , Class ,User , Student , teachers_classes} = require("../models")

const listStudentTeachers = async (req, res) => {



    try {
        let studentUserId = req.user.id
        let student = await Student.findOne({ where :{ userId : studentUserId}})
        let classx = await student.getClass()
        let teachers = await classx.getTeachers()
        for (let teacher of teachers) {
            let user =  await User.findOne({ where: { id: teacher.userId }})
            teacher.dataValues.name = user.name
            teacher.dataValues.email = user.email
        }
        console.log(teachers);
        res.send(teachers)
    } 

    catch (error) {
        res.send('"status":"Something went wrong"')
    }

}

module.exports = { listStudentTeachers }
// listStudentTeachers()