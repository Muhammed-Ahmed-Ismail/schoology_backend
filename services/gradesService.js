const {Exam, StudentExam, Course} = require("../models");

const getGradesStatistics = async (submittedExams) => {
    let data = [];
    for (let exam of submittedExams) {
        let count = await exam.countStudentExams();
        let max = await StudentExam.max('score', {where: {examId: exam.id}});
        let min = await StudentExam.min('score', {where: {examId: exam.id}});
        data.push({exam, count, max, min});
    }
    return data;
}

const getStudentGradesByStudentId = async (student) => {
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
    return grades;
}

module.exports = {
    getGradesStatistics,
    getStudentGradesByStudentId
}
