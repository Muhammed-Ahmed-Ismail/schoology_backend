const express = require("express");
const router = express.Router();
const passport= require('passport')
const {isTeacher , isStudent , isParent} = require('../middleware/roleAuthorization/role')
const {listAvailableGradesByTeacherId, getStudentsGrades, getStudentGrades,getStudentGradesForParent} = require("../controllers/gradesController");
router.use(passport.authenticate('jwt', { session: false }))

router.get('/list/available-grades',isTeacher,listAvailableGradesByTeacherId)
router.get('/list/students-grades/:id',isTeacher,getStudentsGrades)
router.get('/list/my-grades',isStudent,getStudentGrades)
router.get('/list/my-child-grades',isParent,getStudentGradesForParent)

module.exports = router