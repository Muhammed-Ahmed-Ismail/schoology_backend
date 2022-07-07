const uploadFile = require('../services/filesService')
const fs = require('fs');
const path = require('path');
const PORT = process.env.PORT || 3000;
const _BASEURL = `http://localhost:${PORT}/files/`

const filesPath = path.join(__dirname, '..', 'resources', 'static', 'uploads')

const upload = async (req, res, next) => {
    try {
        await uploadFile(req, res);
        if (req.file === undefined){
            return res.status(400).send({message: 'bad request, no file received'})
        }
        res.status(200).send({message: req.file.originalname + ' : uploaded successfully'});
    }catch (e) {
        next(e);
    }
}

const getListFiles = (req, res, next) => {
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

module.exports = {
    upload,
    getListFiles,
    download,
}
