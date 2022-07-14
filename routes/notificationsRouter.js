const controller = require('../controllers/Notification')

const express = require("express");
const router = express.Router();
const passport= require('passport')
router.use(passport.authenticate('jwt', { session: false }))
const {isTeacher , isStudent , isParent} = require('../middleware/roleAuthorization/role')

router.get("/myNots/:id", controller.getMyNotifications);
// router.get("/myNots/:id", {isStudent, isParent, isTeacher}, controller.getMyNotifications);

module.exports = router
