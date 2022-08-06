const {Announcement} = require('../models');

const createAnnouncement = async req => {
    try {
        let announcement = await Announcement.create({
            announcement: req.body.announcement,
            image: req.body.image,
            senderId: req.user.id,
        });
        return announcement;
    } catch (error) {
        throw error;
    }
}

const listAll = async () => {
    try {
        let announcements = await Announcement.findAll({
            order: [
                ['createdAt', 'ASC'],
            ],
        });
        return announcements;
    } catch (error) {
        throw error;
    }
}

const getLast = async () => {
    try {
        let lastAnnouncement = Announcement.findAll({
            order: [
                ['createdAt', 'DESC'],
            ],
            limit: 1,
        });
        return lastAnnouncement;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createAnnouncement,
    listAll,
    getLast
}
