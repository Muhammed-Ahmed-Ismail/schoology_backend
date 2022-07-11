const {create,listBySenderAndReciever
} = require("../controllers/messageController.js")
const express = require("express");
const router = express.Router();

router.post("/create" , create)
router.get("/reciever/:id" , listBySenderAndReciever) // get all messages between sender (jwt) and reciever
module.exports = router