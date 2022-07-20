const controller = require("../controllers/gallaryController");
const express = require("express");
const router = express.Router();

const passport = require('passport')
const {isAdmin} = require('../middleware/roleAuthorization/role')
const {validateAddImage, validateRemoveImage} = require("../middleware/requestValidators/gallary/gallaryRequestsValidator");
router.use(passport.authenticate('jwt', {session: false}))

router.get('/',controller.getGallaryImages)
router.post('/add', isAdmin,validateAddImage, controller.addImage);
router.delete('/delete', isAdmin,validateRemoveImage, controller.removeImage)

module.exports=router