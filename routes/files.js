const {upload, getListFiles, getTeacherFiles, getOne} = require("../controllers/filesController");
const express = require("express");
const router = express.Router();

router.post('/:id/upload', upload);
router.get('/:id/allFiles', getListFiles)
router.get('/:id/myFiles', getTeacherFiles)
router.get('/:id/download/:name', getOne)

module.exports = router
