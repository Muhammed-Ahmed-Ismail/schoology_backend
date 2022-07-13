const {Exam, StudentExam, Student, User, Class, Course, Teacher} = require("../models")
const {getGradesStatistics} = require("../services/gradesService");

const listAvailableGradesByTeacherId = async (req, res) => {
    const teacher = await req.user.getTeacher();
    const submittedExams = await teacher.getExams({
        where: {submitted: true},
        include: [{model: Class, as: 'class', attributes: ['name', 'id']}],
        attributes: ['id', 'name', 'date']
    });
    if (submittedExams) {
        let data = await getGradesStatistics(submittedExams)
        res.json(data)
    }

}


const getStudentsGrades = async (req, res) => {
    let exam = await Exam.findByPk(req.params.id)
    let grades = await exam.getStudentExams({
        include: [{
            model: Student,
            as: 'student',
            attributes: ['id'],
            include: [{
                model: User,
                as: 'user',
                attributes: ['name']
            }]
        },
        ],
        attributes: ['score']
    })
    res.json(grades)
}
const getStudentGrades = async (req, res) => {
    const student = await req.user.getStudent()
    const grades = await student.getStudentExams({
        include: [{
            model: Exam,
            as: 'exam',
            attributes: ['id', 'name'],
            include: [{
                model: Course,
                as: "course",
                attributes: ['name']
            }]
        }]
    })
    res.json(grades)
}
module.exports = {
    listAvailableGradesByTeacherId,
    getStudentsGrades,
    getStudentGrades
}