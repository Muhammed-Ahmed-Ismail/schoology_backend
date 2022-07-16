// const { Where } = require('sequelize/types/utils');
// const { where } = require('sequelize/types');
const {Student , StudentExam , User} = require('../models');
const { use } = require('../routes/meeting');
 const BulkSaveResultsToDB = async  (data , examId)=> {

    // User.bulkCreate([
    //     { username: 'barfooz', isAdmin: true },
    //     { username: 'foo', isAdmin: true },
    //     { username: 'bar', isAdmin: false }
    //   ])
     console.log(data)
    let emails = []
    let scores = []
    if(data['responses']) {
        data['responses'].forEach(reponse => {
            let email = reponse['respondentEmail']|| Object.values(reponse['answers'])[0]['textAnswers']['answers'][0]['value']
            let score = reponse['totalScore']
            emails.push(email)
            scores.push(score)
        });
    } else {
        throw new Error("no submissions yet")
    }
     console.log(emails)
     console.log(scores)
    for (let i = 0; i < emails.length; i++) {
        let user =  await User.findOne({ where: { email: emails[i] } })
        if(user != undefined){
            let student = await Student.findOne({ where: { userId: user.id } })
            console.log(student)
        if(student != undefined && student != null && scores[i] != null){
           let studetExam = await StudentExam.update({score: scores[i]},{where:{studentId: student.id, examId: examId}});
            console.log("sid",studetExam.studentId,"score",studetExam.score)
        }
        }
    }
    
    return '{"status":"success"}' //CHECK THIS
}


module.exports = {BulkSaveResultsToDB};