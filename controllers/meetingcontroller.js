const {
    createMeetingService,
    getMeetingByTeacherId,
    getAllMeetingsByTeacherId,
    getMeetingByStudentId,
    getAllMeetingsByStudentId,
    updateMeetingService,
    getAllMeetingsByParentId,
    getMeetingByParentId,
    deleteMeetingService,
    getAllMeetingsForAdmin
} = require("../services/meetingServices");

const {Teacher, Class} = require("../models");

const createMeeting = async (req, res, next) => {
    try {
        let meeting = await createMeetingService(req.body);
        res.status(201).json(meeting);
    } catch (error) {
        error.status = 400;
        next(error);
    }
}

const getMyMeetings = async (req, res, next) => {
    console.log('req query', {...req.query})
    try {
        if (req.user.roleId === 1) {
            let meetings = await getMeetingByTeacherId(req.params.id, req.query.date)
            res.status(200).json([...meetings]);
        } else if (req.user.roleId === 2) {
            let meetings = await getMeetingByStudentId(req.params.id, req.query.date)
            res.status(200).json([...meetings]);
        } else if (req.user.roleId === 3) {
            let meetings = await getMeetingByParentId(req.params.id, req.query.date)
            res.status(200).json([...meetings]);
        } else {
            res.status(400).json('invalid user req');
        }
    } catch (e) {
        e.status = 500;
        e.body = 'server error';
        next(e);
    }
}

const getAllMeetings = async (req, res, next) => {
    try {
        if (req.user.roleId === 1) {
            let meetings = await getAllMeetingsByTeacherId(req.params.id)
            res.status(200).json([...meetings]);
        } else if (req.user.roleId === 2) {
            let meetings = await getAllMeetingsByStudentId(req.params.id)
            res.status(200).json([...meetings]);
        } else if (req.user.roleId === 3) {
            let meetings = await getAllMeetingsByParentId(req.params.id)
            res.status(200).json([...meetings]);
        } else if (req.user.roleId === 4) {
            let meetings = await getAllMeetingsForAdmin();
            res.status(200).json([...meetings]);
        } else {
            res.status(400).json('invalid user');
        }
    } catch (e) {
        e.status = 500;
        next(e);
    }
}

const updateMeeting = async (req, res, next) => {
    try {
        let message = await updateMeetingService(req);
        message.status === 200 ? res.status(200).json([...message.meeting])
            : res.status(message.status).json(message.message);
    } catch (error) {
        error.status = 400;
        next(error);
    }
}

const deleteMeeting = async (req, res) => {
    try {
        await deleteMeetingService(req.params.id, req.user.id);
        return res.status(200).send({message: "deleted successfully"});
    } catch (error) {
        return res.status(400).send(error);
    }
};

const checkIsValidTime = async (req, res) => {
    console.log(req.query);
    const data = req.query;
    data.classId = parseInt(data.classId);
    data.period = parseInt(data.period);
    data.teacherId = parseInt(data.teacherId);
    const classroom = await Class.findByPk(data.classId);
    const teacher = await Teacher.findByPk(data.teacherId);

    if (!await classroom.isThatValidMeeting(data.date_time, data.period)) {
        res.json({error: "That class has another meeting in the same time !!"});
    } else if (!await teacher.isThatValidMeeting(data.date_time, data.period)) {
        res.json({error: "Teacher has another meeting in the same time !!"})
    } else {
        res.json({success: "That time is available "})
    }

}

module.exports = {
    createMeeting,
    getMyMeetings,
    getAllMeetings,
    updateMeeting,
    deleteMeeting,
    checkIsValidTime
}
