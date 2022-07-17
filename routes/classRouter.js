const controller = require("../controllers/classController");
const express = require("express");
const router = express.Router();

const passport = require('passport')
const {isAdmin} = require('../middleware/roleAuthorization/role')
router.use(passport.authenticate('jwt', {session: false}))

router.get('/', controller.getAll)
router.get('/:id', controller.findByPk)
router.post('/', isAdmin, controller.createClass);
router.put('/:id', isAdmin, controller.updateClass)
router.delete('/:id', isAdmin, controller.deleteClass)
router.get('/list-students/:id', controller.getClassStudentsWithParents)

module.exports = router
