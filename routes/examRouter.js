const {create,list,save,listBycourseId,listByclassId , listStudentExamByExamId,listByTeacherId
} = require("../controllers/examController")
const express = require("express");
const router = express.Router();

router.post("/create" , create)
router.get("/list" , list)
router.get("/list/course/:id" , listBycourseId) //list all exams for one course
router.get("/list/class/:id" , listByclassId) // list all exams for one class
router.get("/list/scores/:id" , listStudentExamByExamId) //lists students with scores for certian exam
router.get("/list/teacher/:id" , listByTeacherId) //lists students with teacher for certian exam
router.post("/save" , save) // saves students score to the database given body -> { "link" : "google form url here" }

module.exports = router