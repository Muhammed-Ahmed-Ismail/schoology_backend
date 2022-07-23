const controller = require('../controllers/Notification')

const express = require("express");
const router = express.Router();
const passport= require('passport')
router.use(passport.authenticate('jwt', { session: false }))

router.get("/myNots/:id", controller.getMyNotifications);
router.get("/myNotsCount",controller.getMyNewNotificationsCount)

module.exports = router
