const util = require('util');
const multer = require('multer');
const path = require('path');

const filesPath = path.join(__dirname, '..', 'resources', 'static', 'uploads')

//TODO: SEQUELIZE
let storage = multer.diskStorage({
   destination: (req, file, cb) => {
       cb(null, filesPath);
   },
    filename: (req, file, cb) => {
        console.log('file name : ' + file.originalname);
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage }).single('file')

let uploadService = util.promisify(upload)
module.exports = uploadService;
