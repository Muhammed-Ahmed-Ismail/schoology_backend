const controller = require('../controllers/NotificationController')

const express = require("express");
const router = express.Router();

const passport= require('passport');
router.use(passport.authenticate('jwt', { session: false }));

router.get("/myNots/:id", controller.getMyNotifications);
router.get("/myNotsCount",controller.getMyNewNotificationsCount)

module.exports = router
