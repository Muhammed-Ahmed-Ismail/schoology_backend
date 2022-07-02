const express = require("express");
const router = express.Router();

const meetingRouter = require("./meeting")
const testdbRoutes = require("./testdb")

router.use("/meeting",meetingRouter)
router.use("/dptest",testdbRoutes)


module.exports = router