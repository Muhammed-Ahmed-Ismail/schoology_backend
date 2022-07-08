const express = require("express");
const router = express.Router();

const meetingRouter = require("./meeting")
const testdbRoutes = require("./testdb")
const authRoutes = require("./authRoutes")
const filesRoutes = require("./files")

router.use("/meeting",meetingRouter)
router.use("/dptest",testdbRoutes)
router.use("/auth",authRoutes)
router.use("/files", filesRoutes)

const examRouter = require("./examRouter")
const messageRouter = require("./messageRouter")
router.use("/exam",examRouter)
router.use("/message",messageRouter)

module.exports = router
