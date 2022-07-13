const {createClass, findByPk, updateClass, deleteClass, getAll , getClassStudentsWithParents} = require("../controllers/classController");
const express = require("express");
const router = express.Router();

router.get('/', getAll)
router.get('/:id', findByPk)
router.post('/', createClass);
router.put('/:id', updateClass)
router.delete('/:id', deleteClass)
router.get('/list-students/:id', getClassStudentsWithParents)

module.exports = router
