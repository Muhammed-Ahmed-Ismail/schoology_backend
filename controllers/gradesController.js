const {Exam, Student, User, Class} = require("../models");
const {getGradesStatistics, getStudentGradesByStudentId} = require("../services/gradesService");

const listAvailableGradesByTeacherId = async (req, res) => {
    try {
        const teacher = await req.user.getTeacher();
        const submittedExams = await teacher.getExams({
            where: {submitted: true},
            include: [
                {
                    model: Class,
                    as: 'class',
                    attributes: ['name', 'id']
                }],
            attributes: ['id', 'name', 'date']
        });
        if (submittedExams) {
            let data = await getGradesStatistics(submittedExams);
            res.status(200).json(data);
        }else {
            res.status(404).json([]);
        }
    }catch (error) {
        res.status(500).json({status: "db error", error: error});
    }
}

const getStudentsGrades = async (req, res) => {
    try {
        let exam = await Exam.findByPk(req.params.id);
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
            }],
            attributes: ['score']
        })
        if (grades) {
            res.status(200).json([...grades]);
        }else {
            res.status(404).json([]);
        }
    }catch (error) {
        res.status(400).json([{status: 'exam does not exist', error: error}]);
    }
}

const getStudentGrades = async (req, res) => {
    try {
        const student = await req.user.getStudent();
        const grades = await getStudentGradesByStudentId(student);
        if (grades) {
            res.status(200).json([...grades]);
        }else {
            res.status(404).json([]);
        }
    }catch (error) {
        res.status(500).json({status: "db error", error: error});
    }
}

const getStudentGradesForParent = async (req, res) => {
    try {
        const parent = await req.user.getParent();
        const student = await parent.getStudent();
        const grades = await getStudentGradesByStudentId(student);
        if (grades) {
            res.status(200).json([...grades]);
        }else {
            res.status(404).json([]);
        }
    }catch (error) {
        res.status(500).json({status: "db error", error: error});
    }
}

module.exports = {
    listAvailableGradesByTeacherId,
    getStudentsGrades,
    getStudentGrades,
    getStudentGradesForParent
}
