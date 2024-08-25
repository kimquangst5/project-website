

const express = require('express');
const router = express.Router();
const controller = require('../../controller/admin/general-setting.controller');
const checkLogInMiddleWares = require('../../middlewares/admin/checklogin.middlewares')

router.get('/', checkLogInMiddleWares, controller.index);

module.exports = router;