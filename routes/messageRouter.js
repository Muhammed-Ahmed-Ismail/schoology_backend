const {create,listBySenderAndReciever
} = require("../controllers/messageController.js")
const  {validateCreateMessageRequest} = require("../middleware/requestValidators/messages/createMessageRequest")

const express = require("express");
const router = express.Router();
const passport= require('passport')

router.use(passport.authenticate('jwt', { session: false }))
router.post("/create" , validateCreateMessageRequest , create)
router.get("/reciever/:id" , listBySenderAndReciever) // get all messages between sender (jwt) and reciever
module.exports = router


//To Do
//header -> authorization : bearer {token from login here } // use req.user  
////notice this ^^ will be put in message router to extract sender ID , it will also be added before any router that need authorization

//route to get certain student all exams scores