let {announcement: Announcements} = require("../models");

const create = async (req, res) => {
    let senderId = req.user.id;
    console.log(req.user.id);
    try {
        let announcement = await Announcements.create({
            announcement: req.body.announcement,
            image: req.body.image,
            senderId: senderId,
        })
        return res.json(announcement)
    } catch (error) {
        res.send(error)
    }
}

const list = async (req, res) => {
    try {
        let announcements = await Announcements.findAll({
            order: [
                ['createdAt', 'ASC'],
            ],
        })
        return res.json(announcements)
    } catch (error) {
        res.send('"status":"Something went wrong"')
    }

}

const getLastAnnouncement = async (req, res) => {
    try {
        const announcement = await Announcements.findAll({
            order: [
                ['createdAt', 'DESC'],
            ],
            limit: 1,
        })
        res.json(announcement)
    } catch (error) {
        res.send('"status":"Something went wrong"')
    }
}
module.exports = {create, list, getLastAnnouncement}
