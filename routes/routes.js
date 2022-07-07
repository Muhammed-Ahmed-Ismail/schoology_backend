const express = require("express");
const router = express.Router();

const meetingRouter = require("./meeting")
const testdbRoutes = require("./testdb")
const authRoutes = require("./authRoutes")

router.use("/meeting",meetingRouter)
router.use("/dptest",testdbRoutes)
router.use("/auth",authRoutes)

const examRouter = require("./examRouter")
const messageRouter = require("./messageRouter")
router.use("/exam",examRouter)
router.use("/message",messageRouter)


module.exports = router