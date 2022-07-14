const express = require("express");
const router = express.Router();

const meetingRouter = require("./meeting")
const testdbRoutes = require("./testdb")
const authRoutes = require("./authRoutes")
const filesRoutes = require("./files")
const classRoutes = require("./classRouter")
const courseRoutes = require("./courseRouter")
const NotificationRouter = require('./notificationsRouter')


const gradesRoutes = require("./gradesRoutes")
router.use("/meeting",meetingRouter)
router.use("/dptest",testdbRoutes)
router.use("/auth",authRoutes)
router.use("/files", filesRoutes)
router.use("/class", classRoutes)
router.use("/course", courseRoutes)


const examRouter = require("./examRouter")
const messageRouter = require("./messageRouter")
const teacherRouter = require("./teacherRouter.js")
router.use("/exam",examRouter)
router.use("/message",messageRouter)
router.use("/teacher",teacherRouter)
router.use("/grades",gradesRoutes)

router.use("/nots", NotificationRouter)
module.exports = router
