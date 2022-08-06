const {Student, StudentExam, User} = require('../../models');
const {sendNotificationsToStudentsAndParents} = require("../NotificationsService");
const bulkSaveExamResultsToDB = async (data, exam) => {
    console.log(data)
    let emails = []
    let scores = []
    let answers = []
    if (data['responses']) {
        data['responses'].forEach(response => {
            let email = response['respondentEmail'] ||
                Object.values(response['answers'])[0]['textAnswers']['answers'][0]['value'];
            let score = response['totalScore'];
            let answer = response['answers'];
            emails.push(email);
            scores.push(score);
            answers.push(answer);
        });
    } else {
        // !! return {status: "no submission"} !!
        throw new Error("no submissions yet");
    }
    console.log(emails)
    console.log(scores)
    console.log(answers)
    for (let i = 0; i < emails.length; i++) {
        let user = await User.findOne({where: {email: emails[i]}});
        if (user !== undefined) {
            let student = await Student.findOne({where: {userId: user.id}});
            console.log(student)
            if (student !== undefined && student != null && scores[i] != null) {
                let studentExam = await StudentExam.update({score: scores[i]}, {
                    where: {
                        studentId: student.id,
                        examId: exam.id
                    }
                });
                console.log("sid", studentExam.studentId, "score", studentExam.score)
            }
        }
    }
    await sendNotificationsToStudentsAndParents(exam.teacherId, exam.classId,
        `${exam.name} grades are Now available`);

    return {status:"success"};
}

module.exports = {bulkSaveExamResultsToDB};
