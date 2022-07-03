const express = require("express");
const router = express.Router();

const meetingRouter = require("./meeting")
const testdbRoutes = require("./testdb")
const examRouter = require("./examRouter")

router.use("/meeting",meetingRouter)
router.use("/dptest",testdbRoutes)
router.use("/exam",examRouter)


module.exports = router