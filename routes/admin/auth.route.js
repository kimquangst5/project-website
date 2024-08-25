const express = require('express');
const router = express.Router();
const controller = require('../../controller/admin/auth.controller');

router.get('/', controller.index);

router.post('/auth/login', controller.login);

router.patch('/auth/logout', controller.logout);

module.exports = router;