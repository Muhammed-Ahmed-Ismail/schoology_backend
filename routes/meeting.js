const {createMeeting} = require("../controllers/meetingcontroller")

const express = require("express");
const router = express.Router();

router.route("/create").post(createMeeting)

module.exports = router