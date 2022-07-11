const {create,list,save,listBycourseId,listByclassId , listStudentExamByExamId
} = require("../controllers/examController")
const  {validateCreateExamRequest} = require("../middleware/requestValidators/exams/createExamRequest")
const express = require("express");
const router = express.Router();

router.post("/create" , validateCreateExamRequest , create)
router.get("/list" , list)
router.get("/list/course/:id" , listBycourseId) //list all exams for one course
router.get("/list/class/:id" , listByclassId) // list all exams for one class
router.get("/list/scores/:id" , listStudentExamByExamId) //lists students with scores for certian exam
router.post("/save" , save) // saves students score to the database given body -> { "link" : "google form url here" }

module.exports = router