const {Exam, StudentExam, Student, User, Class, Course, Teacher} = require("../models")

const getGradesStatistics = async (submittedExams) => {
    let data = []
    for (let exam of submittedExams) {
        let count = await exam.countStudentExams()
        let max = await StudentExam.max('score', {where: {examId: exam.id}})
        let min = await StudentExam.min('score', {where: {examId: exam.id}})
        data.push({exam, count, max, min})
    }
    return data
}

module.exports = {
    getGradesStatistics
}