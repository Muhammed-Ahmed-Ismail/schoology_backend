const {Student , StudentExam , User} = require('../models');
const {sendNotificationToClass} = require("./Notifications");

const fillStudentExam = async  (exam)=> {
studentsInClass = await Student.findAll({
    where: {
        classId: exam.classId
    }
})
let recordsToInsert = [];
for (const student of studentsInClass) {

    recordsToInsert.push({
        studentId : student.id,
        examId : exam.id,
    })
    console.log("create exam student",student.id)
}
let studentsexams = await StudentExam.bulkCreate(recordsToInsert)
    await sendNotificationToClass(exam.teacherId, exam.classId, `${exam.name} quiz is Now on site`);

    return studentsexams
}

module.exports = {fillStudentExam};