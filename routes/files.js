const {upload, getListFiles, getTeacherFiles, getOne, download} = require("../controllers/filesController");
const express = require("express");
const router = express.Router();

router.post('/:id/upload', upload);
router.get('/:id/allFiles', getListFiles)
router.get('/:id/download/:name', download)
router.get('/:id/myFiles', getTeacherFiles)

module.exports = router
