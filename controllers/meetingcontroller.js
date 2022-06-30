const {createMeetingService} = require("../services/meetingServices")

const createMeeting = async (req, res) => {
    console.log("create meetign service")
    try {
       let meeting = await createMeetingService(req.body)
        console.log(meeting)
        res.json(meeting)
    } catch (error)
    {
        res.send(error)
    }
}

module.exports = {createMeeting}