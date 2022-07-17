const {createMeeting,getMyMeetings, getAllMeetings, deleteMeeting, updateMeeting
} = require("../controllers/meetingcontroller")
const  {validateCreateMeetingRequest} = require("../middleware/requestValidators/meetings/createMeetingRequest")
const express = require("express");
const router = express.Router();
const passport= require('passport')

router.use(passport.authenticate('jwt', { session: false }))
router.post("/create",validateCreateMeetingRequest,createMeeting)
router.get("/my-meetings/:id",getMyMeetings)
router.get("/all-meetings/:id", getAllMeetings)
router.put("/update/:id", updateMeeting)
router.delete("/delete/:id", deleteMeeting)

module.exports = router
