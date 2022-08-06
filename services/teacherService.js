const {Student, User} = require("../models")

const listStudentTeachersService = async (studentUserId) => {
    try {
        let student = await Student.findOne({where: {userId: studentUserId}});
        let studentClass = await student.getClass();
        let teachers = await studentClass.getTeachers();
        for (let teacher of teachers) {
            let user = await User.findOne({where: {id: teacher.userId}});
            teacher.dataValues.name = user.name;
            teacher.dataValues.email = user.email;
        }
        return teachers;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    listStudentTeachersService
}
