
const {getResFromApiService} = require("../services/getResFromApiService")

const {
    BulkSaveResultsToDB,
} = require("../services/bulkSaveResultsToDB")


let {Exam} = require("../models")
// const {User, Student, Role, Class, Meeting, Teacher} = require("../models/exam")

const create = async (req, res) => {
    try {
        let examx = await Exam.create({
            name: req.body.name,
            link: req.body.link,
            date: req.body.date,
            courseId: req.body.courseId,
            classId: req.body.classId,
        })
        return res.json(examx)
    } catch (error) {
        res.send(error)
    }
}

const list = async (req, res) => {
    try {
        let exams = await Exam.findAll()
        return res.json(exams)
    } catch (error) {
        res.send(error)
    }
}


const listBycourseId = async (req, res) => {
    try {
        let exams = await Exam.findAll({where: { courseId: req.params.id },})
        return res.json(exams)
    } catch (error) {
        res.send(error)
    }
}

const listByclassId = async (req, res) => {
    try {
        let exams = await Exam.findAll({where: { classId: req.params.id },})
        return res.json(exams)
    } catch (error) {
        res.send(error)
    }
}


const save = async (req, res) => {
    link = req.body.link //teacher sends link in post body
    parts = link.split("/")
    formID = parts[5]
    console.log(res);
    let exam = await Exam.findOne({ where: { link: link } });
    let examId = exam.id
    
    // try {
        result = await getResFromApiService(formID);
        statusx = await BulkSaveResultsToDB(result , examId);
        res.send(statusx)
    // } 
    // catch (error) {
    //     res.send(error)
    //     console.log("error");
    // }
}

module.exports = {create , list , save , listBycourseId , listByclassId}