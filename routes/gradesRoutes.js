const express = require("express");
const router = express.Router();
const passport= require('passport')
const {isTeacher , isStudent , isParent} = require('../middleware/roleAuthorization/role')
const {listAvailableGradesByTeacherId} = require("../controllers/gradesController");
router.use(passport.authenticate('jwt', { session: false }))

router.get('/list/available-grades',isTeacher,listAvailableGradesByTeacherId)


module.exports = router