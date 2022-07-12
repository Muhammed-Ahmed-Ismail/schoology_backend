const express = require("express");
const router = express.Router();

const meetingRouter = require("./meeting")
const testdbRoutes = require("./testdb")
const authRoutes = require("./authRoutes")
const filesRoutes = require("./files")
const examRouter = require("./examRouter")
const messageRouter = require("./messageRouter")
const gradesRoutes = require("./gradesRoutes")
router.use("/meeting",meetingRouter)
router.use("/dptest",testdbRoutes)
router.use("/auth",authRoutes)
router.use("/files", filesRoutes)
router.use("/exam",examRouter)
router.use("/message",messageRouter)
router.use("/grades",gradesRoutes)

module.exports = router
