const util = require('util');
const multer = require('multer');
const path = require('path');
const {File,Teacher,Class,User,Course} = require('../models')
const {where} = require("sequelize");

const filesPath = path.join(__dirname, '..', 'resources', 'static', 'uploads')

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, filesPath);
    },
    filename:  async (req, file, cb) => {
        console.log(req.body)
        let teacher =   await req.user.getTeacher()
        let classRoom = await Class.findByPk(req.body.classId)
        await File.create({
            uploaderId: teacher.id,
            name: classRoom.name+': '+file.originalname,
            classId: req.body.classId
        })
        sendNotificationToClass(req.params.id, req.body.classId, 'a new file has been uploaded check it out')
        console.log('file name : ' + file.originalname);
        cb(null, file.originalname);
    },
    //doesnt work
    onFileUploadData: (file, data, req, res) => {
        console.log('from upload data')
    },
    onFileUploadComplete: file => {
        console.log('from complete')
    }
});

const upload = multer({
    storage: storage,
}).array('files', 1)

const getFilesById = async (id) => {
    try {
        let files = await File.findAll({where: {id}})
        return files
    } catch (e) {
        throw e
    }
}
const getFilesByUploaderId = async (teacher) => {
    try {
        const files = await teacher.getFiles({
            include:[{
                model:Class,
                as:"class",
                attributes:['name']
            }]
        })
        return files
    } catch (e) {
        throw e
    }

}
const getFilesByClassId = async (classRoom) => {
    try {
        const files = await classRoom.getFiles({
            include: [
                {
                    model: Teacher,
                    as:'teacher',
                    include:[{
                        model:User,
                        as:'user',
                        attributes:['name']
                    },{
                        model: Course,

                        attributes: ['name']
                    }],
                    attributes:['id']
                }
            ]
        })
        return files
    } catch (e) {
        throw e
    }
}
const getFileByName = async (name) => {
    try {
        let file = await File.findOne({where: {name}})
        return file;
    } catch (e) {
        throw e;
    }
}

const getAllFiles = async () => {
    try {
        let files = await File.findAll()
        return files
    } catch (e) {
        throw e
    }
}

let uploadService = util.promisify(upload)

module.exports = {
    uploadService,
    getFilesById,
    getFileByName,
    getAllFiles,
    getFilesByUploaderId,
    getFilesByClassId
}
