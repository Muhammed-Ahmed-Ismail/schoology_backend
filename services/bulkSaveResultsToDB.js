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
            let email = reponse['respondentEmail']
            let score = reponse['totalScore']
            emails.push(email)
            scores.push(score)
        });
    } else {
        throw new Error("no submissions yet")
    }
     console.log(emails)
    for (let i = 0; i < emails.length; i++) {
        let user =  await User.findOne({ where: { email: emails[i] } })
        if(user != undefined){
            let student = await Student.findOne({ where: { userId: user.id } })

        if(student != undefined && student != null ){
            let studentexam =  await StudentExam.findOne({where: {studentId: student.id, examId: examId}});
           if(studentexam != null){ studentexam.score = scores[i] ; studentexam.save()}
        }
        }
    }
    
    return '{"status":"success"}' //CHECK THIS
}


module.exports = {BulkSaveResultsToDB};