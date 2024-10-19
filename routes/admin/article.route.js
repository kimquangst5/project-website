const express = require('express');
const router = express.Router();
const controller = require("../../controller/admin/article.controller");

router.get('/', controller.index);

router.get('/create', controller.create);

module.exports = router;