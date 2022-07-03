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
    emails = []
    scores = []
    data['responses'].forEach(reponse => {
        let email = Object.values(reponse['answers'])[0]['textAnswers']['answers'][0]['value']
        let score = reponse['totalScore']
        emails.push(email)
        scores.push(score)
    });
    
    // let user =  await User.findOne({ where: { email: email } })
    // let student = await Student.findOne({ where: { userId: user.id } })
    
    if(student != undefined && student != null){
        let studentId = student.id;
        StudentExam.create([{studentId: studentId,examId : examId,score: score}]);
    }
    return '{"status":"success"}' 
}


module.exports = {BulkSaveResultsToDB};