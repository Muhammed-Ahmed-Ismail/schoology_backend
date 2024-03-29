const {
    createMeetingService,
    getMeetingByTeacherId,
    getAllMeetingsByTeacherId,
    getMeetingByStudentId,
    getAllMeetingsByStudentId,
    updateMeetingService,
    getAllMeetingsByParentId, getMeetingByParentId, notifyUsersByMeetingUpdate, notifyUsersByMeetingDeletion
} = require("../services/meetingServices")

const {Meeting, Teacher, Class, Course,User} = require("../models")


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
        } else if (req.query.role === "parent") {
            let meetings = await getMeetingByParentId(req.params.id, req.query.date)
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
        } else if (req.query.role === "student") {
            let meetings = await getAllMeetingsByStudentId(req.params.id)
            res.json(meetings)
        } else if (req.query.role === "admin") {
            let meetings = await Meeting.findAll(
                {
                    include: [{
                        model: Class,
                        as: 'class',
                        attributes: ['name']
                    }, {
                        model: Course,
                        as: 'course',
                        attributes: ['name']
                    },
                        {
                            model: Teacher,
                            as: 'teacher',
                            include:[{
                                model:User,
                                as:'user',
                                attributes: ['name']
                            }],

                        }
                    ]
                }
            );
            res.json(meetings)
        } else if (req.query.role === "parent") {
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
                return res.status(400).send({error: "That time is not valid"});
            }
        }
        const meeting = await Meeting.findByPk(req.params.id)
        Object.assign(meeting, req.body);
        await meeting.save();
        await notifyUsersByMeetingUpdate(meeting, req.user.id)
        res.json(meeting)

    } catch (error) {
        error.status = 400
        next(error)
    }
}

const deleteMeeting = async (req, res) => {
    try {
        const meeting = await Meeting.findByPk(req.params.id);
        await meeting.destroy()
        await notifyUsersByMeetingDeletion(meeting, req.user.id)
        return res.status(200).send({message: "deleted successfully"});
    } catch (error) {
        return res.status(400).send(error);
    }
};

const checkIsValidTime = async (req, res) => {
    console.log(req.query);
    const data = req.query
    data.classId = parseInt(data.classId)
    data.period = parseInt(data.period)
    data.teacherId = parseInt(data.teacherId)
    const classroom = await Class.findByPk(data.classId)
    const teacher = await Teacher.findByPk(data.teacherId)

    if (!await classroom.isThatValidMeeting(data.date_time, data.period))

        res.json({error: "That class has another meeting in the same time !!"})

    else if (!await teacher.isThatValidMeeting(data.date_time, data.period))

        res.json({error: "Teacher has another meeting in the same time !!"})

    else res.json({sucsess: "That time is availabel "})

}

module.exports = {createMeeting, getMyMeetings, getAllMeetings, updateMeeting, deleteMeeting, checkIsValidTime}
