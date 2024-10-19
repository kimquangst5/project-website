const express = require('express');
const router = express.Router();
const controller = require("../../controller/client/auth.controller")

// Bắt đầu luồng Đăng nhập Google
router.get('/auth/google', controller.index);

// Gọi URL lại để xử lý phản hồi Đăng nhập Google
router.get('/auth/google/callback', controller.callback);

module.exports = router;