const {create,list,save,listBycourseId,listByclassId , listStudentExamByExamId
} = require("../controllers/examController")
const express = require("express");
const router = express.Router();

router.post("/create" , create)
router.get("/list" , list)
router.get("/list/course/:id" , listBycourseId)
router.get("/list/class/:id" , listByclassId)
router.get("/list/scores/:id" , listStudentExamByExamId)
router.post("/save" , save)

module.exports = router