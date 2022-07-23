const {getUserNotifications} = require('../services/Notifications')

/**
 * get user notification controller
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */
const getMyNotifications = async (req, res, next) => {
    try {
        let nots = await getUserNotifications(req.params.id);
        res.json(nots);
    }catch (e) {
        e.status = 500;
        next(e);
    }
}

const getMyNewNotificationsCount = async (req,res)=>{
    const count = await req.user.getNumberOfNewNotifications()
    res.json({count})
}

module.exports = {
    getMyNotifications,
    getMyNewNotificationsCount
}
