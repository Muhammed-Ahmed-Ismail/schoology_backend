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

const getMyMeetings = async (req, res, next) => {
    console.log(req.query)
    try {
        if (req.query.role === "teacher") {
            let meetings = await getMeetingByTeacherId(req.params.id, req.query.date)
            res.json(meetings)
        }
        if (req.query.role === "student") {
            let meetings = await getMeetingByStudentId(req.params.id, req.query.date)
            res.json(meetings)
        }
    }catch (e) {
        e.status = 500
        e.body = 'server error'
        next(e)
    }

}

module.exports = {createMeeting, getMyMeetings}
