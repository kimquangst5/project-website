const express = require('express');
const router = express.Router();
const controller = require('../../../../controller/admin/interface/config/config.controller');

router.get('/', controller.index);

router.get('/menu', controller.menu);

router.post('/menu', controller.menuPost);

module.exports = router;