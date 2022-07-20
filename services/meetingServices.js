const {google} = require('googleapis')

const {User, Student, Role, Class, Meeting, Teacher, Parent, Course} = require("../models")
const {sendNotificationToClass} = require('./Notifications')

const GOOGLE_CLIENT_ID = "43384519615-haoarcj3935ckm6s0t0cfh77ed2gd72k.apps.googleusercontent.com"
const GOOGLE_CLIENT_SECRET = "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"
const AUTH_REDIRECT_URI = "http://localhost:4200"
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
    )
    const {tokens} = await oAuthClient.getToken(code)
    oAuthClient.setCredentials({refresh_token: tokens.refresh_token})
    const calendar = google.calendar({version: 'v3', auth: oAuthClient})
    const event = await calendar.events.insert({
            calendarId: 'primary',
            resource: eventData,
            conferenceDataVersion: 1
        }
    )
    return event.data.hangoutLink
}

const createMeetingService = async (data) => {

    const classroom = await Class.findByPk(data.classId)
    const teacher = await Teacher.findByPk(data.teacherId)

    if (!(await teacher.isThatValidMeeting(data.date_time, data.period) && await classroom.isThatValidMeeting(data.date_time, data.period))) {
        console.log("from create getlink")
        throw new Error("invalid meeting timing")
    }

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
        let link = await generateMeetingLink(eventData, data.code)
        console.log(link)
        let meeting = await Meeting.create({
            link,
            teacherId: data.teacherId,
            classId: data.classId,
            courseId: data.courseId,
            name: data.name,
            period: data.period,
            date: data.date_time
        })
        await sendNotificationToClass(data.teacherId, data.classId, `${data.name} meeting has been created in ${data.date_time} at the ${data.period}th period`);
        return meeting
    } catch (error) {
        return error
    }

}

const getMeetingByTeacherId = async (teacherId, date) => {

    try {
        let meetings = null
        let teacher = await Teacher.findByPk(teacherId)
        if (date) {
            meetings = await teacher.getMeetings({
                where: {date},
                include:[{
                    model:Class,
                    as:'class',
                    attributes:['name']
                }]
            })
        } else {
            meetings = await teacher.getMeetings({
                include:[{
                    model:Class,
                    as:'class',
                    attributes:['name']
                }]
            })
        }
        return meetings
    } catch (e) {
        throw e
    }
}

const getMeetingByStudentId = async (studentId, date) => {

    try {
        let student = await Student.findByPk(studentId)
        let studentClass = await student.getClass()
        let meetings = null
        if (date) {
            meetings = await getMeetingsByclassroom(studentClass,date)
        } else {
            meetings = await getMeetingsByclassroom(studentClass)
        }
        return meetings
    } catch (e) {
        console.log(e)
    }
}

const getMeetingByParentId = async (parentId, date) => {
    try {
        let parent = await Parent.findByPk(parentId)
        let student = await parent.getStudent()
        let studentClass = await student.getClass()
        let meetings = null
        if (date) {
            meetings = await getMeetingsByclassroom(studentClass,date)
        } else {
            meetings = await getMeetingsByclassroom(studentClass)
        }
        return meetings
    } catch (e) {
        console.log(e)
        throw e;
    }
}

const getAllMeetingsByTeacherId = async (teacherId) => {
    let meetings = await getMeetingByTeacherId(teacherId)
    return meetings
}

const getAllMeetingsByStudentId = async (studentId) => {
    let meetings = await getMeetingByStudentId(studentId)
    return meetings
}
const getAllMeetingsByParentId = async (parentId) => {
    let meetings = await getMeetingByParentId(parentId)
    return meetings
}

const getMeetingsByclassroom = async (classroom,date)=>{
    let queryParameters={
        include: [
            {
                model: Teacher,
                as: 'teacher',
                include: [{
                    model: User,
                    as: 'user',
                    attributes: ['name']
                }],
                attributes: ['id']

            },
            {
                model: Course,
                as: 'course',
                attributes: ['name']
            },

        ]
    }
    if(date) queryParameters = {... queryParameters,where:{date}}
    const meetings = await classroom.getMeetings(queryParameters)
    return meetings
}

const notifyUsersByMeetingUpdate = async (meeting,adminId)=>{
    const classRoom = await meeting.getClass()
    await sendNotificationToClass(adminId,classRoom.id,`${meeting.name}  meeting time has been changed check it`)
}

const notifyUsersByMeetingDeletion = async (meeting,adminId)=>{
    const classRoom = await meeting.getClass()
    await sendNotificationToClass(adminId,classRoom.id,`${meeting.name} meeting has been canceled`)
}
module.exports = {
    createMeetingService,
    getMeetingByTeacherId,
    getAllMeetingsByTeacherId,
    getMeetingByStudentId,
    getAllMeetingsByStudentId,
    getMeetingByParentId,
    getAllMeetingsByParentId,
    notifyUsersByMeetingUpdate,
    notifyUsersByMeetingDeletion
}
