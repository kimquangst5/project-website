const express = require('express');
const router = express.Router();
const controller = require('../../controller/admin/my-profile.cotroller');

router.get('/', controller.index)

module.exports = router