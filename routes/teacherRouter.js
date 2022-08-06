const {listStudentTeachers} = require("../controllers/teacherController.js")

const express = require("express");
const router = express.Router();

const passport= require('passport');
router.use(passport.authenticate('jwt', { session: false }));

router.get("/my-teachers" , listStudentTeachers)

module.exports = router
