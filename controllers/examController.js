
const {getResFromApiService} = require("../services/getResFromApiService")

const {
    BulkSaveResultsToDB,
} = require("../services/bulkSaveResultsToDB")

const {
    fillStudentExam,
} = require("../services/fillStudentExam")


let {Exam , StudentExam , Student , User,Class,Course,Teacher} = require("../models")

const create = async (req, res) => {
    try {
        let examx = await Exam.create({
            name: req.body.name,
            link: req.body.link,
            date: req.body.date,
            courseId: req.body.courseId,
            teacherId: req.body.teacherId,
            classId: req.body.classId,
        })
        await fillStudentExam(examx.id , examx.classId)
        return res.json(examx)
    } catch (error) {
        res.send(error)
    }
}

const list = async (req, res) => {
    try {
        let exams = await Exam.findAll({where:{submitted:false}})
        return res.json(exams)
    } catch (error) {
        res.send(error)
    }
}


const listBycourseId = async (req, res) => {
    try {
        let exams = await Exam.findAll({where: { courseId: req.params.id,submitted:false},include:[{model:Course,as:'course',attributes:['name','id']},{model:Class,as:'class',attributes:['name','id']}],attributes:['name','id','date','link']})
        return res.json(exams)
    } catch (error) {
        res.send(error)
    }
}

const listByclassId = async (req, res) => {
    try {
        let exams = await Exam.findAll({where: { classId: req.params.id ,submitted:false},})
        return res.json(exams)
    } catch (error) {
        res.send(error)
    }
}

const listStudentExamByExamId = async (req, res) => {
    try {
        let allStudentsScore = await StudentExam.findAll({where: { examId: req.params.id }}) //get all scores for certain exam
        let nameAndScore = [];
        for (const studentScore of allStudentsScore) {
            let student = await Student.findOne({where: { id: studentScore.studentId}})   
            let user = await User.findOne({where: { id: student.id}})
            nameAndScore.push({name : user.name , score : studentScore.score});      
        } //get name of student along with score
        return res.json(nameAndScore)
    } 
    catch (error) {
        res.send(error)
    }

}
const listByTeacherId = async (req,res)=>{
    const teacher = await Teacher.findByPk(req.params.id)
    console.log(teacher)
    let exams = await teacher.getExams({where:{submitted:false},include:[{model:Course,as:'course',attributes:['name','id']},{model:Class,as:'class',attributes:['name','id']}],attributes:['name','id','date','link']})
    return res.json(exams)

}
const save = async (req, res) => {
    link = req.body.link //teacher sends link in post body
    parts = link.split("/")
    formID = parts[5]
    console.log(parts)

    let exam = await Exam.findOne({ where: { link: link } });
    
    try {
        result = await getResFromApiService(formID);
        statusx = await BulkSaveResultsToDB(result , exam.id);
        exam.submitted = true;
        await exam.save()
        res.send(statusx)
    } 
    catch (error) {
        res.send({"error":error.errors[0].message})
        console.log("error in examController");
        console.log(error.errors[0].message);

    }
}


const listStudentExams = async (req,res)=>{

    let exams = await StudentExam.findAll({
        where: {
          studentId: req.user.id,
        }
      })
    return res.json(exams)

}
module.exports = {create , list , save , listBycourseId , listByclassId , listStudentExamByExamId,listByTeacherId , listStudentExams}
//To Do
//route to get certain student all exams scores