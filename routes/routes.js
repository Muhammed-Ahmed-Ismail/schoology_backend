const express = require("express");
const router = express.Router();

const meetingRouter = require("./meeting")
const authRoutes = require("./authRoutes")
const filesRoutes = require("./files")
const classRoutes = require("./classRouter")
const courseRoutes = require("./courseRouter")
const NotificationRouter = require('./notificationsRouter')
const examRouter = require("./examRouter")
const messageRouter = require("./messageRouter")
const teacherRouter = require("./teacherRouter.js")
const announcementRouter = require("./announcementRouter.js")
const gradesRoutes = require("./gradesRoutes")
const gallaryRoutes = require("./gallaryRoutes")

router.use("/meeting",meetingRouter)
router.use("/auth",authRoutes)
router.use("/files", filesRoutes)
router.use("/class", classRoutes)
router.use("/course", courseRoutes)
router.use("/exam",examRouter)
router.use("/message",messageRouter)
router.use("/teacher",teacherRouter)
router.use("/grades",gradesRoutes)
router.use("/announcement",announcementRouter)
router.use("/nots", NotificationRouter)
router.use("/gallary", gallaryRoutes)
module.exports = router
