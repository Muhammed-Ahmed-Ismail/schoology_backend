const express = require("express");
const router = express.Router();

const meetingRouter = require("./meeting")
const testdbRoutes = require("./testdb")
const authRoutes = require("./authRoutes")

router.use("/meeting",meetingRouter)
router.use("/dptest",testdbRoutes)
router.use("/auth",authRoutes)

const examRouter = require("./examRouter")
router.use("/exam",examRouter)


module.exports = router