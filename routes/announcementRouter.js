const {create,list
} = require("../controllers/announcmentController.js")
const  {validateCreateAnnouncmentRequest} = require("../middleware/requestValidators/announcments/createAnnouncmentRequest")

const express = require("express");
const router = express.Router();
const passport= require('passport')

router.use(passport.authenticate('jwt', { session: false }))
router.post("/create" , validateCreateAnnouncmentRequest , create)
router.get("/list" , list)
module.exports = router


