const express = require('express');
const router = express.Router();
const controller = require('../../controller/admin/customers.controller');

router.get('/', controller.index);



module.exports = router;