const express = require("express");
const router = express.Router();
const controller = require("../../controller/client/user.controller")
const userMiddlewares = require("../../middlewares/client/user.middlewares")

router.get('/register', controller.register)

router.post('/register', controller.registerPost)

// Bắt đầu luồng Đăng ký Google
router.get('/register/gmail/auth/google', controller.registerGmail);

// Gọi URL lại để xử lý phản hồi Đăng nhập Google
router.get('/register/gmail/auth/google/callback', controller.registerGmailCallback);

router.get('/login', controller.login)

router.post('/login', controller.loginPost)

// Bắt đầu luồng Đăng ký Google
router.get('/login/gmail/auth/google', controller.loginGmail);

// Gọi URL lại để xử lý phản hồi Đăng nhập Google
router.get('/login/gmail/auth/google/callback', controller.loginGmailCallback);

router.get('/log-out', controller.logOut)

router.get('/forgot-password', controller.forgotPassword)

router.post('/forgot-password', controller.forgotPasswordPost)

router.get('/otp', controller.otp)

router.post('/otp', controller.otpPost)

router.get('/change-password', controller.changePassword)

router.post('/change-password', controller.changePasswordPost)

router.get('/dashboard', userMiddlewares.requireAuth, controller.dashboard)

router.get('/profile', userMiddlewares.requireAuth, controller.profile)

router.patch('/profile', userMiddlewares.requireAuth, controller.profilePatch)


router.get('/change-email', controller.changeEmail)

router.post('/change-email', controller.changeEmailPost)

router.get('/change-email/otp', controller.otpEmail)

router.post('/change-email/otp', controller.otpEmailPost)

router.get('/change-email-success', controller.changeEmailSuccess)

router.post('/change-email-success', controller.changeEmailSuccessPost)




module.exports = router