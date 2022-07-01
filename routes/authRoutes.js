const express = require("express");
const router = express.Router();
const controller = require("../controllers/authController");

router.post("/signin", controller.signup);
router.post("/signin", controller.signin);
router.post("/signout", controller.signout);

module.exports = router;