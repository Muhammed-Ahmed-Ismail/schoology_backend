const express = require("express");
const router = express.Router();
const controller = require("../controllers/authController");
const authRequestValidator = require("../middleware/requestValidators/Auth/authRequestValidator")

router.post("/signup/teacher",authRequestValidator.validateSignupTeacherRequest, controller.signup);
router.post("/signup/student",authRequestValidator.validateSignupStudentRequest, controller.signup);
router.post("/signup/parent",authRequestValidator.validateSignupParentRequest, controller.signup);
router.post("/signup/admin", authRequestValidator.validateSignupAdminRequest, controller.signup)
router.post("/signin", controller.signin);
router.get("/signout", controller.signout);
router.patch("/deactivate/:id", controller.deactivateUser);
router.patch("/activate/:id", controller.activateUser);
router.put("/update/:id", controller.updateUser);
router.get("/allUsers",controller.getAllUsers);
router.get("/allTeachers", controller.getAllTeachers)
router.get("/allStudents", controller.getAllStudentsWithoutParents)
router.post("/reset-password", controller.resetPassword)

module.exports = router;
