const util = require('util');
const multer = require('multer');
const path = require('path');
const {File, Teacher, Class, User, Course} = require('../models');
const {sendNotificationToClass} = require("./Notifications");

const filesPath = path.join(__dirname, '..', 'resources', 'static', 'uploads');

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, filesPath);
    },
    filename: async (req, file, cb) => {
        let teacher = await req.user.getTeacher();
        console.log('req body', {...req.body})
        let classRoom = await Class.findByPk(req.body.classId);
        await File.create({
            uploaderId: teacher.id,
            name: classRoom.name + ': ' + file.originalname,
            classId: req.body.classId
        });
        console.log('file name : ' + file.originalname)
        cb(null, classRoom.name + ': ' + file.originalname);
        await sendNotificationToClass(req.params.id, req.body.classId,
            'a new file has been uploaded check it out');
    }
});

const upload = multer({
    storage: storage,
}).array('files', 1);

const getFilesById = async (id) => {
    try {
        let files = await File.findAll({where: {id}});
        return files;
    } catch (error) {
        throw error;
    }
}
const getFilesByUploaderId = async (teacher) => {
    try {
        const files = await teacher.getFiles({
            include: [{
                model: Class,
                as: "class",
                attributes: ['name']
            }]
        });
        return files;
    } catch (error) {
        throw error
    }
}

const getFilesByClassId = async (classRoom) => {
    try {
        const files = await classRoom.getFiles({
            include: [
                {
                    model: Teacher,
                    as: 'teacher',
                    include: [
                        {
                            model: User,
                            as: 'user',
                            attributes: ['name']
                        },
                        {
                            model: Course,
                            as: 'course',
                            attributes: ['name']
                        }],
                    attributes: ['id']
                }
            ]
        });
        return files;
    } catch (error) {
        throw error;
    }
}

const getFileByName = async (name) => {
    try {
        let file = await File.findOne({where: {name}});
        return file;
    } catch (error) {
        throw error;
    }
}

const getAllFiles = async () => {
    try {
        let files = await File.findAll();
        return files;
    } catch (error) {
        throw error;
    }
}

let uploadService = util.promisify(upload);

module.exports = {
    uploadService,
    getFilesById,
    getFileByName,
    getAllFiles,
    getFilesByUploaderId,
    getFilesByClassId
}
