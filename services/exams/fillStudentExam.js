const {Student, StudentExam, User} = require('../../models');
const {sendNotificationToClass} = require("../NotificationsService");

const fillStudentExam = async (exam) => {
    let studentsInClass = await Student.findAll({
        where: {
            classId: exam.classId
        }
    })
    let recordsToInsert = [];
    for (const student of studentsInClass) {
        recordsToInsert.push({
            studentId: student.id,
            examId: exam.id,
            score: 0
        });
    }
    let studentsExams = await StudentExam.bulkCreate(recordsToInsert)
    await sendNotificationToClass(exam.teacherId, exam.classId, `${exam.name} quiz is Now on site`);
    return studentsExams;
}

module.exports = {fillStudentExam};
