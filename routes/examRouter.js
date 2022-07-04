const {create,list,save,listBycourseId,listByclassId
} = require("../controllers/examController")
const express = require("express");
const router = express.Router();

router.post("/create" , create)
router.get("/list" , list)
router.get("/course/:id" , listBycourseId)
router.get("/class/:id" , listByclassId)
router.post("/save" , save)

module.exports = router