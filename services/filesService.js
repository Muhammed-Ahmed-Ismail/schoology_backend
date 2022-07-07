const util = require('util');
const multer = require('multer');
const path = require('path');
const {File} = require('../models')
const {where} = require("sequelize");

const filesPath = path.join(__dirname, '..', 'resources', 'static', 'uploads')

let storage = multer.diskStorage({
   destination: (req, file, cb) => {
       cb(null, filesPath);
   },
    filename: (req, file, cb) => {
        File.create({
            uploaderId: req.params.id,
            name:file.originalname
        })
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
}).single('file')

const getFilesById = async (id) => {
    try {
        let files = await File.findAll({where: {id}})
        return files
    }catch (e) {
        throw e
    }
}

const getFileByName = async (name) => {
    try {
        let file = await File.findOne({where: {name}})
        return file;
    }catch (e){
        throw e;
    }
}

let uploadService = util.promisify(upload)

module.exports = {
    uploadService,
    getFilesById,
    getFileByName,
}
