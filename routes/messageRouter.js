const {create,listBySenderAndReciever
} = require("../controllers/messageController.js")
const  {validateCreateMessageRequest} = require("../middleware/requestValidators/messages/createMessageRequest")

const express = require("express");
const router = express.Router();
const passport= require('passport')

router.use(passport.authenticate('jwt', { session: false }))
router.post("/create" , validateCreateMessageRequest , create)
router.get("/reciever/:id" , listBySenderAndReciever)
module.exports = router


