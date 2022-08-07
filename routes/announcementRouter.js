const {
    create, list
} = require("../controllers/announcmentController.js")
const {validateCreateAnnouncementRequest} = require("../middleware/requestValidators/announcments/createAnnouncmentRequest")
const {getLastAnnouncement} = require("../controllers/announcmentController");

const express = require("express");
const router = express.Router();

const passport = require('passport')
router.use(passport.authenticate('jwt', {session: false}))

router.post("/create", validateCreateAnnouncementRequest, create)
router.get("/list", list)
router.get("/last", getLastAnnouncement)

module.exports = router
