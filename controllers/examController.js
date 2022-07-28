const {getResFromApiService} = require("../services/exams/getResFromApiService")
const {bulkSaveExamResultsToDB} = require("../services/exams/bulkSaveExamResultsToDB");
const {fillStudentExam} = require("../services/exams/fillStudentExam");
const {Exam, StudentExam, Student, User, Class, Course, Teacher} = require("../models");
const {notifyUsersByExamUpdate, notifyUsersByExamDeletion} = require("../services/exams/examNotifyService");

const create = async (req, res) => {
    console.log(req)
    try {
        let exam = await Exam.create({
            name: req.body.name,
            link: req.body.link,
            date: req.body.date,
            courseId: req.body.courseId,
            teacherId: req.body.teacherId,
            classId: req.body.classId,
        });
        await fillStudentExam(exam);
        return res.status(201).json(exam);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

const list = async (req, res) => {
    try {
        let exams = await Exam.findAll({
            where: {submitted: false},
            include: [
                {
                model: Class,
                as: 'class',
                attributes: ['name']
                },
                {
                    model: Course,
                    as: 'course',
                    attributes: ['name']
                },
                {
                    model: Teacher,
                    as: 'teacher',
                    attributes: ['id'],
                    include: {
                        model: User,
                        as: 'user',
                        attributes: ['name']
                    }
                }]
        });
        if (exams.length !== 0) {
            return res.status(200).json([...exams]);
        }else {
            return res.status(404).json([]);
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
}

const listExamsByCourseId = async (req, res) => {
    try {
        let exams = await Exam.findAll({
            where: {courseId: req.params.id, submitted: false},
            include: [
                {
                    model: Course,
                    as: 'course',
                    attributes: ['name', 'id']
                },
                {
                    model: Class,
                    as: 'class',
                    attributes: ['name', 'id']
                }],
            attributes: ['name', 'id', 'date', 'link']
        });
        if (exams.length !== 0) {
            return res.status(200).json([...exams]);
        }else {
            return res.status(404).json([]);
        }
    } catch (error) {
        res.status(500).send(error);
    }
}

const listExamsByClassId = async (req, res) => {
    try {
        let exams = await Exam.findAll({where: {classId: req.params.id, submitted: false}})
        if (exams.length !== 0) {
            return res.status(200).json([...exams]);
        }else {
            return res.status(404).json([]);
        }
    } catch (error) {
        res.status(500).send(error)
    }
}

const listStudentExamByExamId = async (req, res) => {
    try {
        // get all scores for certain exam
        let allStudentsScore = await StudentExam.findAll({where: {examId: req.params.id}});
        let nameAndScore = [];
        // get name of student along with score
        for (const studentScore of allStudentsScore) {
            let student = await Student.findOne({where: {id: studentScore.studentId}});
            let user = await User.findOne({where: {id: student.id}});
            nameAndScore.push({name: user.name, score: studentScore.score});
        }
        if (nameAndScore.length !== 0) {
            return res.status(200).json([...nameAndScore]);
        }else {
            return res.status(404).json([]);
        }
    } catch (error) {
        res.status(500).send(error)
    }

}

const listByTeacherId = async (req, res) => {
    const teacher = await Teacher.findByPk(req.params.id);
    console.log(teacher)
    let exams = await teacher.getExams({
        where: {submitted: false},
        include: [
            {
                model: Course,
                as: 'course',
                attributes: ['name', 'id']
            },
            {
            model: Class,
            as: 'class',
            attributes: ['name', 'id']
            }],
        attributes: ['name', 'id', 'date', 'link']
    });
    if (exams.length !== 0) {
        return res.status(200).json([...exams]);
    }else {
        return res.status(404).json([]);
    }
}

const getStudentExams = async (req, res) => {
    const student = await req.user.getStudent();
    let exams = await getStudentExamsByStudentId(student);
    if (exams.length !== 0) {
        return res.status(200).json([...exams]);
    }else {
        return res.status(404).json([]);
    }
}

const getMyChildExams = async (req, res) => {
    const parent = await req.user.getParent();
    const student = await parent.getStudent();
    const exams = await getStudentExamsByStudentId(student);
    if (exams.length !== 0) {
        return res.status(200).json([...exams]);
    }else {
        return res.status(404).json([]);
    }
}

const listStudentExams = async (req, res) => {
    let userId = req.user.id;
    let student = await Student.findOne({where: {userId: userId}});
    let exams = await StudentExam.findAll({
        where: {studentId: student.id,},
        include: [
            {model: Exam, as: 'exam'},
            {model: Class, as: 'class'},
            {model: Course, as: 'course'},
        ]
    });
    if (exams.length !== 0) {
        return res.status(200).json([...exams]);
    }else {
        return res.status(404).json([]);
    }
}

const save = async (req, res) => {
    //teacher sends link in post body
    let link = req.body.link
    let parts = link.split("/")
    let formID = parts[5]
    console.log(parts)

    let exam = await Exam.findOne({where: {link: link, submitted: false}});

    try {
        let result = await getResFromApiService(formID);
        let status = await bulkSaveExamResultsToDB(result, exam);
        exam.submitted = true;
        await exam.save();
        if (status) { // expected {status: "Success"} or {status: "no submission"}
            res.status(200).send(status);
        }else {
            res.status(500).send({status: "Error occurred"});
        }
    } catch (error) {
        console.log("error in examController");
        console.log(error);
        res.status(500).send({status: "Error occurred"});
    }
}

const deleteExam = async (req, res) => {
    const exam = await Exam.findByPk(req.params.id);
    if (exam) {
        let result = await exam.destroy();
        if (result) {
            res.status(200).json({delete: true, message:'deleted successfully'});
            await notifyUsersByExamDeletion(exam, req.user.id);
        }
    }else {
        res.status(404).json({delete: false, message:'exam not found'});
    }
}

const updateExam = async (req, res) => {
    let exam = await Exam.findByPk(req.params.id);
    if (exam) {
        exam.name = req.body.name;
        exam.link = req.body.link;
        exam.date = req.body.date;
        exam.courseId = req.body.courseId;
        exam.teacherId = req.body.teacherId;
        exam.classId = req.body.classId;
        await exam.save();
        await notifyUsersByExamUpdate(exam,req.user.id);
        res.status(200).json({update: true, exam});
    } else {
        res.status(500).json({update: false});
    }
}

// ########################## helper methods ################################## //
const getStudentExamsByStudentId = async (student) => {
    const classRoom = await student.getClass()
    const exams = await classRoom.getExams({
        where: {submitted: false},
        include: [
            {
            model: Course,
            as: 'course',
            attributes: ['name', 'id']
            },
            {
            model: Teacher,
            as: 'teacher',
            include: [{
                model: User,
                as: 'user',
                attributes: ['name']
            }]
        }],
        attributes: ['name', 'id', 'date', 'link']
    });
    return exams;
}

module.exports = {
    create,
    list,
    save,
    listExamsByCourseId,
    listExamsByClassId,
    listStudentExamByExamId,
    getStudentExams,
    getMyChildExams,
    listByTeacherId,
    listStudentExams,
    deleteExam,
    updateExam
}
