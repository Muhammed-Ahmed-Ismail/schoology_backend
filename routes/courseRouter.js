const controller = require("../controllers/courseController");
const express = require("express");
const router = express.Router();

const passport = require('passport')
const {isAdmin} = require('../middleware/roleAuthorization/role')
router.use(passport.authenticate('jwt', {session: false}))

router.get('/get-all', controller.getAll)
router.get('/get/:id', controller.findByPk)
router.get('/my-course/:id', controller.getTeacherCourse)
router.post('/create', isAdmin, controller.createCourse);
router.put('/update/:id', isAdmin, controller.updateCourse)
router.delete('/delete/:id', isAdmin, controller.deleteCourse)

module.exports = router
