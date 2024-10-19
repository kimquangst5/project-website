const express = require('express');
const router = express.Router();
const controller = require("../../../controller/admin/trash/trash.account.controller")

router.get('/', controller.index);

router.patch('/:id', controller.restore);

router.delete('/:id', controller.delete);

module.exports = router;