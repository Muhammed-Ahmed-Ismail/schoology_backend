const {upload, getListFiles, getTeacherFiles, getOne, download, getListFilesFromStorage,getStudentFiles,getMyChildFiles} = require("../controllers/filesController");
const express = require("express");
const router = express.Router();
const passport= require('passport')
const {isTeacher , isStudent , isParent} = require('../middleware/roleAuthorization/role')
router.get('/:name', download)

router.use(passport.authenticate('jwt', { session: false }))

router.post('/:id/upload', upload);
router.get('/:id/allFiles', getListFiles)
router.get('/download/:name', getOne)
router.get('/teacher/myFiles',isTeacher, getTeacherFiles)
router.get('/student/myFiles',isStudent, getStudentFiles)
router.get('/parent/myFiles',isParent, getMyChildFiles)

module.exports = router
