const {google} = require('googleapis');

const {User, Student, Class, Meeting, Teacher, Parent, Course} = require("../models");
const {sendNotificationToClass} = require('./NotificationsService');

const GOOGLE_CLIENT_ID = process.env.MEET_GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.MEET_GOOGLE_CLIENT_SECRET;
const AUTH_REDIRECT_URI = process.env.AUTH_REDIRECT_URI;

const periods = {
    1: "T08:00:00-02:00",
    2: "T09:00:00-02:00",
    3: "T10:00:00-02:00",
    4: "T11:00:00-02:00",
    5: "T12:00:00-02:00",
    6: "T13:00:00-02:00",
    7: "T14:00:00-02:00",
    8: "T14:00:00-02:00",
}

const generateMeetingLink = async (eventData, code) => {
    const oAuthClient = new google.auth.OAuth2(
        GOOGLE_CLIENT_ID,
        GOOGLE_CLIENT_SECRET,
        AUTH_REDIRECT_URI
    );
    const {tokens} = await oAuthClient.getToken(code);
    oAuthClient.setCredentials({refresh_token: tokens.refresh_token});
    const calendar = google.calendar({version: 'v3', auth: oAuthClient});
    const event = await calendar.events.insert({
            calendarId: 'primary',
            resource: eventData,
            conferenceDataVersion: 1
        }
    );
    return event.data.hangoutLink;
}

const createMeetingService = async (data) => {
    let eventData = {
        'summary': data.description,
        'description': data.description,
        'start': {
            'dateTime': data.date_time + periods[data.period],
        },
        'end': {
            'dateTime': data.date_time + periods[data.period + 1],
        },
        'conferenceData': {
            'createRequest': {
                'requestId': data.date_time + "7qxalsvy0e",
                // 'conferenceSolutionKey':{'type':'hangoutsMeet'},
            },
        },
    }
    try {
        let link = await generateMeetingLink(eventData, data.code);
        console.log(link)
        let meeting = await Meeting.create({
            link,
            teacherId: data.teacherId,
            classId: data.classId,
            courseId: data.courseId,
            name: data.name,
            period: data.period,
            date: data.date_time
        });
        await sendNotificationToClass(data.teacherId, data.classId,
            `${data.name} meeting has been created in ${data.date_time} at the ${data.period} period`);
        return meeting;
    } catch (error) {
        throw error;
    }

}

const notifyUsersByMeetingUpdate = async (meeting) => {
    const classRoom = await meeting.getClass()
    await sendNotificationToClass(meeting.teacherId, classRoom.id,
        `${meeting.name}  meeting time has been changed check it`);
}

const updateMeetingService = async (req) => {
    try {
        const classroom = await Class.findByPk(req.body.classId);
        const teacher = await Teacher.findByPk(req.body.teacherId);

        const classroomChanged = req.body.classId && classroom.id !== req.body.classId;
        const teacherChanged = req.body.teacherId && teacher.id !== req.body.teacherId;

        if (teacherChanged || classroomChanged) {
            if (!(await teacher.isThatValidMeeting(req.body.date, req.body.period)
                && await classroom.isThatValidMeeting(req.body.date, req.body.period))) {
                return {
                    status: 400,
                    message: "That time is not valid"
                }
            }
        }
        const meeting = await Meeting.findByPk(req.params.id);
        Object.assign(meeting, req.body);
        await meeting.save();
        await notifyUsersByMeetingUpdate(meeting);
        return {
            status: 200,
            meeting: meeting
        }
    } catch (error) {
        throw error;
    }
}

const getMeetingByTeacherId = async (teacherId, date) => {
    try {
        let meetings = null;
        let teacher = await Teacher.findByPk(teacherId);
        if (date) {
            meetings = await teacher.getMeetings({
                where: {date},
                include: [{
                    model: Class,
                    as: 'class',
                    attributes: ['name']
                }]
            })
        } else {
            meetings = await teacher.getMeetings({
                include: [{
                    model: Class,
                    as: 'class',
                    attributes: ['name']
                }]
            });
        }
        return meetings;
    } catch (e) {
        throw e;
    }
}

const getMeetingsByClassRoom = async (classroom, date) => {
    let queryParameters = {
        include: [{
                model: Teacher,
                as: 'teacher',
                include: [{
                    model: User,
                    as: 'user',
                    attributes: ['name']
                }],
                attributes: ['id']
            },{
                model: Course,
                as: 'course',
                attributes: ['name']
            }]
    }
    if (date) queryParameters = {...queryParameters, where: {date}};
    const meetings = await classroom.getMeetings(queryParameters);
    return meetings;
}

const getMeetingByStudentId = async (studentId, date) => {
    try {
        let student = await Student.findByPk(studentId);
        let studentClass = await student.getClass();
        let meetings = null;
        if (date) {
            meetings = await getMeetingsByClassRoom(studentClass, date);
        } else {
            meetings = await getMeetingsByClassRoom(studentClass);
        }
        return meetings;
    } catch (e) {
        console.log(e)
    }
}

const getMeetingByParentId = async (parentId, date) => {
    try {
        let parent = await Parent.findByPk(parentId);
        let student = await parent.getStudent();
        let studentClass = await student.getClass();
        let meetings = null;
        if (date) {
            meetings = await getMeetingsByClassRoom(studentClass, date);
        } else {
            meetings = await getMeetingsByClassRoom(studentClass);
        }
        return meetings;
    } catch (e) {
        console.log(e)
        throw e;
    }
}

const getAllMeetingsByTeacherId = async (teacherId) => {
    let meetings = await getMeetingByTeacherId(teacherId);
    return meetings;
}

const getAllMeetingsByStudentId = async (studentId) => {
    let meetings = await getMeetingByStudentId(studentId);
    return meetings;
}
const getAllMeetingsByParentId = async (parentId) => {
    let meetings = await getMeetingByParentId(parentId);
    return meetings;
}

const getAllMeetingsForAdmin = async () => {
    return await Meeting.findAll({
        include: [{
            model: Class,
            as: 'class',
            attributes: ['name']
        }, {
            model: Course,
            as: 'course',
            attributes: ['name']
        }, {
            model: Teacher,
            as: 'teacher',
            include: [{
                model: User,
                as: 'user',
                attributes: ['name']
            }],
        }]
    });
}

const notifyUsersByMeetingDeletion = async (meeting, adminId) => {
    const classRoom = await meeting.getClass();
    await sendNotificationToClass(meeting.teacherId, classRoom.id,
        `${meeting.name} meeting has been canceled`);
}

const deleteMeetingService = async (meetingId, userId) => {
    const meeting = await Meeting.findByPk(meetingId);
    await meeting.destroy();
    await notifyUsersByMeetingDeletion(meeting, userId);
}

module.exports = {
    createMeetingService,
    updateMeetingService,
    getMeetingByTeacherId,
    getAllMeetingsByTeacherId,
    getMeetingByStudentId,
    getAllMeetingsByStudentId,
    getMeetingByParentId,
    getAllMeetingsByParentId,
    getAllMeetingsForAdmin,
    deleteMeetingService,
}
