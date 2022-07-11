const {create,list,save,listBycourseId,listByclassId , listStudentExamByExamId,listByTeacherId , listStudentExams
} = require("../controllers/examController")
const  {validateCreateExamRequest} = require("../middleware/requestValidators/exams/createExamRequest")
const express = require("express");
const router = express.Router();
const passport= require('passport')
const {isTeacher , isStudent , isParent} = require('../middleware/roleAuthorization/role')
router.use(passport.authenticate('jwt', { session: false }))

router.post("/create" , isTeacher , validateCreateExamRequest , create)
router.get("/list" , list)
router.get("/list/course/:id" , listBycourseId) //list all exams for one course
router.get("/list/class/:id" , listByclassId) // list all exams for one class
router.get("/list/scores/:id" , listStudentExamByExamId) //lists students with scores for certian exam
router.get("/list/teacher/:id" , listByTeacherId) //lists students with teacher for certian exam
router.get("/my-exams" , listStudentExams) //lists all exams for certain student
router.post("/save" , save) // saves students score to the database given body -> { "link" : "google form url here" }

module.exports = router