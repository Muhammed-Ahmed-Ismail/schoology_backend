const {
    createMeetingService,
    getMeetingByTeacherId,
    getAllMeetingsByTeacherId,
    getMeetingByStudentId
} = require("../services/meetingServices")

const createMeeting = async (req, res,next) => {
    console.log("create meetign service")
    try {
        let meeting = await createMeetingService(req.body)
        res.json(meeting)
    } catch (error) {
        error.status=400
        next(error)
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

const getAllTeacherMeetings = async (req, res, next) => {
    try {
        let meetings = await getAllMeetingsByTeacherId(req.params.id)
        res.json(meetings)
    }catch (e) {
        e.status = 500
        next(e)
    }
}

module.exports = {createMeeting, getMyMeetings, getAllTeacherMeetings}
