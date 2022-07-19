const {Notification, Student, Teacher, User} = require('../models')

/**
 * @description get userNotification
 * @param id
 * @returns {Promise<Model[]>}
 */
const getUserNotifications = async  (id) => {
    try {
        let nots = await Notification.findAll(
            {
                where: {receiverId: id},
                include: {
                    association: 'sender', //leave it sender
                    attributes: ['name']
                },
                order: [
                    ['createdAt', 'DESC'],
                ],
            },
        );
        return nots;
    }catch (e) {
        throw e;
    }
}

/**
 * @description create a notification in the db
 * @param sender
 * @param receivers
 * @param content
 * @returns {Promise<void>}
 */
const createNotification = async (sender, receivers, content) => {
    try {
        await Notification.create({
            sourceId: sender,
            receiverId: receivers,
            content: content
        });
    }catch (e) {
        throw e;
    }
}

/**
 * @description create a notification for class in db
 * @param sender
 * @param classId
 * @param content
 * @returns {Promise<{message: string, status: number}>}
 */
const sendNotificationToClass = async (sender, classId, content) => {
    try{
        let students = await Student.findAll({where:{classId: classId}});
        console.log('send notification to class', classId);
        if (students.length !== 0){
            for (let student of students) {
                await createNotification(sender, student.id, content);
            }
            return {status: 201, message: "notifications created"};
        }
        else{
            return {status: 404, message: "class is empty"};
        }
    }catch (e){
        throw e;
    }
}

module.exports = {
    getUserNotifications,
    createNotification,
    sendNotificationToClass
}
