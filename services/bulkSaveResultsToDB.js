// const { Where } = require('sequelize/types/utils');
// const { where } = require('sequelize/types');
const {Student, StudentExam, User} = require('../models');
const {use} = require('../routes/meeting');
const {sendNotificationsToStudentsAndParents} = require("./Notifications");
const BulkSaveResultsToDB = async (data, exam) => {

    // User.bulkCreate([
    //     { username: 'barfooz', isAdmin: true },
    //     { username: 'foo', isAdmin: true },
    //     { username: 'bar', isAdmin: false }
    //   ])
    console.log(data)
    let emails = []
    let scores = []
    let answers = []
    if (data['responses']) {
        data['responses'].forEach(reponse => {
            let email = reponse['respondentEmail'] || Object.values(reponse['answers'])[0]['textAnswers']['answers'][0]['value']
            let score = reponse['totalScore']
            let answer = reponse['answers']
            emails.push(email)
            scores.push(score)
            answers.push(answer)
        });
    } else {
        throw new Error("no submissions yet")
    }
    console.log(emails)
    console.log(scores)
    console.log(answers)
    for (let i = 0; i < emails.length; i++) {
        let user = await User.findOne({where: {email: emails[i]}})
        if (user != undefined) {
            let student = await Student.findOne({where: {userId: user.id}})
            console.log(student)
            if (student != undefined && student != null && scores[i] != null) {
                let studetExam = await StudentExam.update({score: scores[i]}, {
                    where: {
                        studentId: student.id,
                        examId: exam.id
                    }
                });
                console.log("sid", studetExam.studentId, "score", studetExam.score)
            }
        }
    }
    await sendNotificationsToStudentsAndParents(exam.teacherId, exam.classId, `${exam.name} grades are Now available`);

    return '{"status":"success"}' //CHECK THIS
}


module.exports = {BulkSaveResultsToDB};