const {upload, getListFiles, getTeacherFiles, getOne, download, getListFilesFromStorage} = require("../controllers/filesController");
const express = require("express");
const router = express.Router();

router.post('/:id/upload', upload);
router.get('/:id/allFiles', getListFiles)
router.get('/:id/download/:name', getOne)
router.get('/:name', download)
router.get('/:id/myFiles', getTeacherFiles)

module.exports = router
