const {createClass, findByPk, updateClass, deleteClass, getAll} = require("../controllers/classController");
const express = require("express");
const router = express.Router();

router.get('/', getAll)
router.get('/:id', findByPk)
router.post('/', createClass);
router.put('/:id', updateClass)
router.delete('/:id', deleteClass)

module.exports = router
