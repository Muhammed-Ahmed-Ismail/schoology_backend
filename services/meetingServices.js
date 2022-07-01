const {google} = require('googleapis')

const {User, Student, Role, Class, Meeting, Teacher} = require("../models")

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
    console.log("from create getlink")

    const oAuthClient = new google.auth.OAuth2(
        GOOGLE_CLIENT_ID,
        GOOGLE_CLIENT_SECRET,
        "http://localhost:4200"
    )

    // let code = req.body.code
    const {tokens} = await oAuthClient.getToken(code)
    console.log(tokens)
    oAuthClient.setCredentials({refresh_token: tokens.refresh_token})
    const calendar = google.calendar({version: 'v3', auth: oAuthClient})
    // const eventData={
    //     'summary': 'Google I/O 2015',
    //     'location': '800 Hasrd St., San Francisco, CA 94103',
    //     'description': 'A chance to hear more about Google\'s developer products.',
    //     'start': {
    //         'dateTime': '2022-06-30T08:00:00-07:00',
    //         'timeZone': 'America/Los_Angeles',
    //     },
    //     'end': {
    //         'dateTime': '2022-06-30T12:00:00-07:00',
    //         'timeZone': 'America/Los_Angeles',
    //     },
    //     'conferenceData':{
    //         'createRequest':{
    //             'requestId':"7qxalsvy0e",
    //             // 'conferenceSolutionKey':{'type':'hangoutsMeet'},
    //         },
    //     },
    //
    // }
    const event = await calendar.events.insert({
            calendarId: 'primary',
            resource: eventData,
            conferenceDataVersion: 1
        }
    )
    // res.send({link:event.data.hangoutLink})
    return event.data.hangoutLink
}

const createMeetingService = async (data) => {
    console.log("from meetign service")
    console.log(data.classId)
    console.log(data.date_time)
    console.log(data.period)
    const classroom = await Class.findByPk( data.classId)
    const teacher = await Teacher.findByPk( data.teacherId)
    console.log(classroom)
    let v = await teacher.isThatValidMeeting(data.date_time, data.period)
    console.log(" after v from create service")
    console.log(v)

    if (!(await teacher.isThatValidMeeting(data.date_time, data.period) && await classroom.isThatValidMeeting(data.date_time, data.period))) {
        console.log(" invalid from create service")

        throw new Error("invalid meeting timing")
    }
    console.log("after if")
    let eventData = {
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
    console.log(eventData)
    try {
    console.log("from service try")
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
    return meeting
    }catch (error)
    {
        console.log(error)
    }

}


module.exports = {createMeetingService}
