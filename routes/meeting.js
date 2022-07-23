const {createMeeting,getMyMeetings, getAllMeetings, deleteMeeting, updateMeeting, checkIsValidTime
} = require("../controllers/meetingcontroller")
const  {validateCreateMeetingRequest} = require("../middleware/requestValidators/meetings/createMeetingRequest")
const express = require("express");
const router = express.Router();
const passport= require('passport')
const {isAdmin, isTeacher} = require("../middleware/roleAuthorization/role");
const {canCreateMeeting} = require("../middleware/PermisionAuthorization/MeetingPermission");

router.use(passport.authenticate('jwt', { session: false }))
router.post("/create", canCreateMeeting ,validateCreateMeetingRequest,createMeeting)
router.get("/my-meetings/:id",getMyMeetings)
router.get("/all-meetings/:id", getAllMeetings)
router.put("/update/:id", isAdmin, updateMeeting)
router.delete("/delete/:id", isAdmin, deleteMeeting)
router.get("/is-valid-time",checkIsValidTime)

module.exports = router
