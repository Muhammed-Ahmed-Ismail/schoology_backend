const {upload, getListFiles, getTeacherFiles, getOne, download, getListFilesFromStorage,getStudentFiles,getMyChildFiles} = require("../controllers/filesController");
const express = require("express");
const router = express.Router();
const passport= require('passport')
router.use(passport.authenticate('jwt', { session: false }))
const {isTeacher , isStudent , isParent} = require('../middleware/roleAuthorization/role')

router.post('/:id/upload', upload);
router.get('/:id/allFiles', getListFiles)
router.get('/:id/download/:name', getOne)
router.get('/:name', download)
router.get('/teacher/myFiles',isTeacher, getTeacherFiles)
router.get('/student/myFiles',isStudent, getStudentFiles)
router.get('/parent/my-child-Files',isParent, getMyChildFiles)

module.exports = router
