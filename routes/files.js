const {upload, download, getListFiles} = require("../controllers/filesController");
const express = require("express");
const router = express.Router();

router.post('/upload', upload);
router.get('/allFiles', getListFiles)
router.get('/:name', download)

module.exports = router
