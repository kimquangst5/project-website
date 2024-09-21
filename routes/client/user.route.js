const express = require("express");
const router = express.Router();
const controller = require("../../controller/client/user.controller")

router.get('/register', controller.register)

router.post('/register', controller.registerPost)

router.get('/login', controller.login)

router.post('/login', controller.loginPost)

router.get('/log-out', controller.logOut)

router.get('/forgot-password', controller.forgotPassword)

router.post('/forgot-password', controller.forgotPasswordPost)

router.get('/otp', controller.otp)

router.post('/otp', controller.otpPost)

router.get('/change-password', controller.changePassword)

router.post('/change-password', controller.changePasswordPost)



module.exports = router