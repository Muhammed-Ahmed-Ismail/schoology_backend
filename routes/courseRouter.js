const {createCourse, findByPk, updateCourse, deleteCourse, getAll} = require("../controllers/courseController");
const express = require("express");
const router = express.Router();

router.get('/', getAll)
router.get('/:id', findByPk)
router.post('/', createCourse);
router.put('/:id', updateCourse)
router.delete('/:id', deleteCourse)

module.exports = router
