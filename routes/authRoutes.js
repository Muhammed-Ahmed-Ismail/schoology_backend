const express = require("express");
const router = express.Router();
const controller = require("../controllers/authController");
const authRequestValidator = require("../middleware/requestValidators/Auth/authRequestValidator")

router.post("/signup/teacher",authRequestValidator.validateSignupTeacherRequest, controller.signup);
router.post("/signup/student",authRequestValidator.validateSignupStudentRequest, controller.signup);
router.post("/signup/parent",authRequestValidator.validateSignupParentRequest, controller.signup);
router.post("/signin", controller.signin);
router.post("/signout", controller.signout);

module.exports = router;