const express = require('express');
const router = express.Router();
const controller = require('../../../../controller/admin/interface/customize/customize.controller');

router.get('/', controller.index);

router.get('/header', controller.header);
module.exports = router;