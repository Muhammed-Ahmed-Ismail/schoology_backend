const controller = require("../controllers/examController")
const  {validateExamRequest} = require("../middleware/requestValidators/exams/createExamRequest")
const express = require("express");
const router = express.Router();
const passport= require('passport')
const {isTeacher , isStudent , isParent, isAdmin} = require('../middleware/roleAuthorization/role')
router.use(passport.authenticate('jwt', { session: false }))

router.post("/create" , isTeacher || isAdmin , validateExamRequest , controller.create)
router.get("/list" , controller.list)
router.get("/my-exams" ,isStudent , controller.getStudentExams) //lists all exams for certain student
router.get("/my-child-exams" ,isParent , controller.getMyChildExams) //lists all exams for certain student
router.get("/list/course/:id" , controller.listBycourseId) //list all exams for one course
router.get("/list/class/:id" , controller.listByclassId) // list all exams for one class
router.get("/list/scores/:id" , controller.listStudentExamByExamId) //lists students with scores for certain exam
router.get("/list/teacher/:id" , controller.listByTeacherId) //lists students with teacher for certain exam
router.get("/my-exams" ,isStudent , controller.listStudentExams) //lists all exams for certain student
router.post("/save" , controller.save) // saves students score to the database given body -> { "link" : "google form url here" }
router.delete("/:id" , isAdmin, controller.deleteExam) // delete exam with id
router.put("/:id" , isAdmin, validateExamRequest , controller.updateExam) // saves students score to the database given body -> { "link" : "google form url here" }

module.exports = router
