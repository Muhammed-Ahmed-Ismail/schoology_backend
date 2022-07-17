const {getResFromApiService} = require("../services/getResFromApiService")

const {
    BulkSaveResultsToDB,
} = require("../services/bulkSaveResultsToDB")

const {
    fillStudentExam,
} = require("../services/fillStudentExam")


let {Exam, StudentExam, Student, User, Class, Course, Teacher} = require("../models")


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
        await fillStudentExam(examx.id, examx.classId)
        return res.json(examx)
    } catch (error) {
        res.send(error)
    }
}

const list = async (req, res) => {
    try {
        let exams = await Exam.findAll({where: {submitted: false}})
        return res.json(exams)
    } catch (error) {
        res.send(error)
    }
}


const listBycourseId = async (req, res) => {
    try {
        let exams = await Exam.findAll({
            where: {courseId: req.params.id, submitted: false},
            include: [{model: Course, as: 'course', attributes: ['name', 'id']}, {
                model: Class,
                as: 'class',
                attributes: ['name', 'id']
            }],
            attributes: ['name', 'id', 'date', 'link']
        })
        return res.json(exams)
    } catch (error) {
        res.send(error)
    }
}

const listByclassId = async (req, res) => {
    try {
        let exams = await Exam.findAll({where: {classId: req.params.id, submitted: false},})
        return res.json(exams)
    } catch (error) {
        res.send(error)
    }
}

const listStudentExamByExamId = async (req, res) => {
    try {
        let allStudentsScore = await StudentExam.findAll({where: {examId: req.params.id}}) //get all scores for certain exam
        let nameAndScore = [];
        for (const studentScore of allStudentsScore) {
            let student = await Student.findOne({where: {id: studentScore.studentId}})
            let user = await User.findOne({where: {id: student.id}})
            nameAndScore.push({name: user.name, score: studentScore.score});
        } //get name of student along with score
        return res.json(nameAndScore)
    } catch (error) {
        res.send(error)
    }

}
const listByTeacherId = async (req, res) => {
    const teacher = await Teacher.findByPk(req.params.id)
    console.log(teacher)
    let exams = await teacher.getExams({
        where: {submitted: false},
        include: [{model: Course, as: 'course', attributes: ['name', 'id']}, {
            model: Class,
            as: 'class',
            attributes: ['name', 'id']
        }],
        attributes: ['name', 'id', 'date', 'link']
    })
    return res.json(exams)

}
const getStudentExams = async (req, res) => {
    const student = await req.user.getStudent()
    let exams = await getStudentExamsByStudentId(student)
    res.json(exams)
}



const getMyChildExams = async (req, res) => {

    const parent = await req.user.getParent()
    const student = await parent.getStudent()
    const exams = await getStudentExamsByStudentId(student)
    res.json(exams)
}

// const getStudentExamsByStudentId = async (student)=>{
//
// }


const listStudentExams = async (req, res) => {
    let userId = req.user.id;
    student = await Student.findOne({where: {userId: userId}})
    let exams = await StudentExam.findAll({
        where: {
            studentId: student.id,
        },
        include: {
            model: Exam, as: 'exam'

        }
    })
    return res.json(exams)

}
const save = async (req, res) => {
    let link = req.body.link //teacher sends link in post body
    let parts = link.split("/")
    let formID = parts[5]
    console.log(parts)


    let exam = await Exam.findOne({where: {link: link, submitted: false}});

    try {
        let result = await getResFromApiService(formID);
        let statusx = await BulkSaveResultsToDB(result, exam.id);
        exam.submitted = true;
        await exam.save()
        res.send(statusx)
    } catch (error) {

        res.send({"error": "Error occured"})
        console.log("error in examController");
        console.log(error.errors[0].message);

    }
}

const deleteExam = async (req, res) => {
    const exam = await Exam.findByPk(req.params.id)
    let status = {"status": "Exam not found"}
    if (exam) {
        let result = await exam.destroy()
        if (result) {
            status = {"status": "successfully deleted "}
        }
    }
    return res.json(status)

}

const updateExam = async (req, res) => {
    let exam = await Exam.findByPk(req.params.id)
    if (exam) {
        exam.name = req.body.name,
            exam.link = req.body.link,
            exam.date = req.body.date,
            exam.courseId = req.body.courseId,
            exam.teacherId = req.body.teacherId,
            exam.classId = req.body.classId,
            await exam.save()
    } else {
        exam = {"status": "Exam not found"}
    }

    return res.json(exam)
}


// ########################## helper methods ################################## //
const getStudentExamsByStudentId = async (student)=>{
    const classRoom = await student.getClass()
    const exams = await classRoom.getExams({
        where: {submitted: false},
        include: [{
            model: Course,
            as: 'course',
            attributes: ['name', 'id']
        },
            {
                model: Teacher,
                as:'teacher',
                include:[{
                    model:User,
                    as:'user',
                    attributes:['name']
                }]
            }
        ],
        attributes: ['name', 'id', 'date', 'link']
    })

    return exams
}

module.exports = {
    create,
    list,
    save,
    listBycourseId,
    listByclassId,
    listStudentExamByExamId,
    getStudentExams,
    getMyChildExams,
    listByTeacherId,
    listStudentExams,
    deleteExam,
    updateExam
}
