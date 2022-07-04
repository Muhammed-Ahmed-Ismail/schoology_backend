const {create,list,save
} = require("../controllers/examController")
const express = require("express");
const router = express.Router();

router.post("/create" , create)
router.get("/list" , list)
router.post("/save" , save)

module.exports = router