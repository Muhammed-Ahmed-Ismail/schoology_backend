const {google} = require('googleapis')

const GOOGLE_CLIENT_ID = "43384519615-haoarcj3935ckm6s0t0cfh77ed2gd72k.apps.googleusercontent.com"
const GOOGLE_CLIENT_SECRET = "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"
const AUTH_REDIRECT_URI = "http://localhost:4200"


const createMeeting = async (req, res) => {
    const oAuthClient = new google.auth.OAuth2(
        GOOGLE_CLIENT_ID,
        GOOGLE_CLIENT_SECRET,
        "http://localhost:4200"
    )
    let code = req.body.code
    const {tokens} = await oAuthClient.getToken(code)
    oAuthClient.setCredentials({refresh_token:tokens.refresh_token})
    const calendar = google.calendar({version:'v3',auth:oAuthClient})
    const eventData={
        'summary': 'Google I/O 2015',
        'location': '800 Hasrd St., San Francisco, CA 94103',
        'description': 'A chance to hear more about Google\'s developer products.',
        'start': {
            'dateTime': '2022-06-30T08:00:00-07:00',
            'timeZone': 'America/Los_Angeles',
        },
        'end': {
            'dateTime': '2022-06-30T12:00:00-07:00',
            'timeZone': 'America/Los_Angeles',
        },
        'conferenceData':{
            'createRequest':{
                'requestId':"7qxalsvy0e",
                // 'conferenceSolutionKey':{'type':'hangoutsMeet'},
            },
        },

    }
    const event = await calendar.events.insert({
        calendarId: 'primary',
        resource: eventData,
        conferenceDataVersion: 1}
    )
    res.send({link:event.data.hangoutLink})
}

module.exports = {createMeeting}