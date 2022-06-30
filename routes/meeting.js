const {createMeeting} = require("../controllers/meetingcontroller")
const  {validateCreateMeetingRequest} = require("../middleware/requestValidators/meetings/createMeetingRequest")
const express = require("express");
const router = express.Router();

router.post("/create",validateCreateMeetingRequest,createMeeting)

module.exports = router