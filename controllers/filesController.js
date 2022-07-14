const {uploadService, getFilesById, getFileByName, getAllFiles, getFilesByUploaderId,getFilesByClassId} = require('../services/filesService')
const fs = require('fs');
const path = require('path');
const PORT = process.env.PORT || 3000;
const _BASEURL = `http://localhost:${PORT}/files/`

const filesPath = path.join(__dirname, '..', 'resources', 'static', 'uploads')

const upload = async (req, res, next) => {
    // console.log('req222222',req)
    // console.log('req file',req.files.file)
    try {
        await uploadService(req, res);
        if (req.file === undefined){
            return res.status(400).send({message: 'bad request, no file received'})
        }
        res.status(200).send({message: req.file.originalname + ' : uploaded successfully'});
    }catch (e) {
        next(e);
    }
}

const getListFilesFromStorage = (req, res, next) => {
    fs.readdir(filesPath, function (err, files) {
        if (err) {
            res.status(500).send({
                message: 'Unable to get files!',
            });
        }
        try {
            let fileInfos = [];
            files.forEach((file) => {
                fileInfos.push({
                    name: file,
                    url: _BASEURL + file,
                });
            });
            res.status(200).send(fileInfos);
        }catch (e) {
            next(e)
        }
    });
};

const getListFiles = async (req, res, next) => {
    try {
        let files = await getAllFiles()
        res.json(files)
    }catch (e) {
        e.status = 500
        next(e)
    }
}

const getTeacherFiles = async (req, res, next) => {
    try {
        const teacher = await req.user.getTeacher()
        let files = await getFilesByUploaderId(teacher)
        res.json(files)
    }catch (e) {
        e.status = 500
        console.log(e)
        next(e)
    }
}

const getStudentFiles = async (req,res,next)=>{
    try {
        const student = await req.user.getStudent()
        const classRoom = await student.getClass()
        let files = await getFilesByClassId(classRoom)
        res.json(files)
    }catch (e) {
        e.status = 500
        console.log(e)
        next(e)
    }
}
const getMyChildFiles = async (req,res,next)=>{
    try {
        const parent = await req.user.getParent()
        const student = await parent.getStudent()
        const classRoom = await student.getClass()
        let files = await getFilesByClassId(classRoom)
        res.json(files)
    }catch (e) {
        e.status = 500
        console.log(e)
        next(e)
    }
}
const download = (req, res) => {
    const fileName = req.params.name;
    res.download(path.join(filesPath, fileName), (err) => {
        if (err) {
            res.status(500).send({
                message: "Could not download the file. " + err,
            });
        }
    });
}

const getOne = async (req, res) => {
    try {
        let file = await getFileByName(req.params.name)
        res.json(_BASEURL+file.name)
    }catch (e) {
        e.status = 404
        res.json(e)
    }
}

module.exports = {
    upload,
    getListFiles,
    download,
    getTeacherFiles,
    getStudentFiles,
    getMyChildFiles,
    getListFilesFromStorage,
    getOne,
}
