const {listStudentTeachersService} = require("../services/teacherService");

const listStudentTeachers = async (req, res) => {
    try {
        let teachers = await listStudentTeachersService(req.user.id)
        res.status(200).json(teachers);
    } catch (error) {
        res.status(500).json({status: "Something went wrong"});
    }
}

module.exports = {listStudentTeachers}
