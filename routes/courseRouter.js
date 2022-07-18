const controller = require("../controllers/courseController");
const express = require("express");
const router = express.Router();

router.get('/', controller.getAll)
router.get('/:id', controller.findByPk)
router.get('/my-course/:id', controller.getTeacherCourse)
router.post('/', controller.createCourse);
router.put('/:id', controller.updateCourse)
router.delete('/:id', controller.deleteCourse)

module.exports = router
