const express = require("express");
const {createUser} = require("../controllers/test/testdbcontroller")
const router = express.Router();
const passport= require('passport')

router.post("/create-user",passport.authenticate('jwt', { session: false }),createUser)

module.exports = router