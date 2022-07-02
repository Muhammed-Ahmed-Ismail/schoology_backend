const {
    createMeetingService,
    getMeetingByTeacherId,
    getMeetingByStudentId
} = require("../services/meetingServices")

const createMeeting = async (req, res) => {
    console.log("create meetign service")
    try {
        let meeting = await createMeetingService(req.body)
        res.json(meeting)
    } catch (error) {
        res.send(error)
    }
}

const getMyMeetings = async (req, res) => {
    if (req.body.role === "teacher") {
        let meetings = await getMeetingByTeacherId(req.params.id, req.body.date)
        res.json(meetings)
    }
    if (req.body.role === "student") {
        let meetings = await getMeetingByStudentId(req.params.id, req.body.date)
        res.json(meetings)
    }

}
module.exports = {createMeeting, getMyMeetings}