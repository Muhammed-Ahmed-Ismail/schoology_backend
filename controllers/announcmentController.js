const {createAnnouncement, listAll, getLast} = require('../services/announcementService')

const create = async (req, res) => {
    try {
        let announcement = await createAnnouncement(req);
        return res.status(201).json(announcement);
    } catch (error) {
        res.status(500).send(error);
    }
}

const list = async (req, res) => {
    try {
        let announcements = await listAll();
        return res.json(announcements)
    } catch (error) {
        res.send('"status":"Something went wrong"')
    }
}

const getLastAnnouncement = async (req, res) => {
    try {
        const announcement = await getLast();
        res.status(200).json(announcement);
    } catch (error) {
        res.send('"status":"Something went wrong"')
    }
}

module.exports = {create, list, getLastAnnouncement}
