const {
    create, listBySenderAndReciever,getMySentMessages,getMyReceivedMessages,listPossibleRecipients,createMessage
} = require("../controllers/messageController.js")
const {validateCreateMessageRequest} = require("../middleware/requestValidators/messages/createMessageRequest")

const express = require("express");
const router = express.Router();
const passport = require('passport')

router.use(passport.authenticate('jwt', {session: false}))
router.post("/create", validateCreateMessageRequest, createMessage)
router.get("/reciever/:id", listBySenderAndReciever) // get all messages between sender (jwt) and reciever
router.get("/my-sent-messages", getMySentMessages) // get all messages between sender (jwt) and reciever
router.get("/my-received-messages", getMyReceivedMessages) // get all messages between sender (jwt) and reciever
router.get("/my-message-recipients", listPossibleRecipients) // get all messages between sender (jwt) and reciever
module.exports = router


