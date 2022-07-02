const {createMeeting,getMyMeetings
} = require("../controllers/meetingcontroller")
const  {validateCreateMeetingRequest} = require("../middleware/requestValidators/meetings/createMeetingRequest")
const express = require("express");
const router = express.Router();

router.post("/create",validateCreateMeetingRequest,createMeeting)
router.get("/my-meetings/:id",getMyMeetings)

module.exports = router