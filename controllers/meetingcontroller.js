const {
    createMeetingService,
    getMeetingByTeacherId,
    getAllMeetingsByTeacherId,
    getMeetingByStudentId,
    getAllMeetingsByStudentId,
    updateMeetingService,
    getAllMeetingsByParentId
} = require("../services/meetingServices")

const { Meeting, Teacher, Class } = require("../models")


const createMeeting = async (req, res, next) => {
    console.log("create meetign service")
    try {
        let meeting = await createMeetingService(req.body)
        res.json(meeting)
    } catch (error) {
        error.status = 400
        next(error)
    }
}

const getMyMeetings = async (req, res, next) => {
    try {
        if (req.query.role === "teacher") {
            let meetings = await getMeetingByTeacherId(req.params.id, req.query.date)
            res.json(meetings)
        } else if (req.query.role === "student") {
            let meetings = await getMeetingByStudentId(req.params.id, req.query.date)
            res.json(meetings)
        } else if (req.query.role === "parent")
        {
            let meetings = await getAllMeetingsByParentId(req.params.id, req.query.date)
            res.json(meetings)
        }
            } catch (e) {
        e.status = 500
        e.body = 'server error'
        next(e)
    }

}

const getAllMeetings = async (req, res, next) => {
    try {
        if (req.query.role === "teacher") {
            let meetings = await getAllMeetingsByTeacherId(req.params.id)
            res.json(meetings)
        }
        if (req.query.role === "student") {
            let meetings = await getAllMeetingsByStudentId(req.params.id)
            res.json(meetings)
        }
        if (req.query.role === "admin") {
            let meetings = Meeting.findAll();
            res.json(meetings)
        }

        if (req.query.role === "parent") {
            let meetings = await getAllMeetingsByParentId(req.params.id)
            res.json(meetings)
        }

    } catch (e) {
        e.status = 500
        next(e)
    }
}

const updateMeeting = async (req, res, next) => {
    try {
        const classroom = await Class.findByPk(req.body.classId)
        const teacher = await Teacher.findByPk(req.body.teacherId)

        const classroomChanged = req.body.classId && classroom.id !== req.body.classId;
        const teacherChanged = req.body.teacherId && teacher.id !== req.body.teacherId;

        if (teacherChanged || classroomChanged) {
            if (!(await teacher.isThatValidMeeting(req.body.date, req.body.period) && await classroom.isThatValidMeeting(req.body.date, req.body.period))) {
                return res.status(400).send(error);
            }
        }
        const meeting = await Meeting.findByPk(req.params.id)
        Object.assign(meeting, req.body);
        await meeting.save();
        res.json(meeting)

    } catch (error) {
        error.status = 400
        next(error)
    }
}

const deleteMeeting = async (req, res) => {
    try {
        await Meeting.destroy({ where: { id: req.params.id } });
        return res.status(200).send({ message: "deleted successfully" });
    }
    catch (error) {
        return res.status(400).send(error);
    }
};

module.exports = { createMeeting, getMyMeetings, getAllMeetings, updateMeeting, deleteMeeting }
