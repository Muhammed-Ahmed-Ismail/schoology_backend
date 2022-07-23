const {create,list
} = require("../controllers/announcmentController.js")
const  {validateCreateAnnouncmentRequest} = require("../middleware/requestValidators/announcments/createAnnouncmentRequest")

const express = require("express");
const router = express.Router();
const passport= require('passport')
const {getLastAnnouncement} = require("../controllers/announcmentController");

router.use(passport.authenticate('jwt', { session: false }))
router.post("/create" , validateCreateAnnouncmentRequest , create)
router.get("/list" , list)
router.get("/last" , getLastAnnouncement)
module.exports = router


