const express = require('express');
const router = express.Router();
const controller = require('../../controller/admin/interface.controller');

router.get('/', controller.index);

router.get('/edit', controller.edit);

router.get('/edit/box-product', controller.editBoxProduct);

router.patch('/edit/box-product', controller.editBoxProductPatch);





module.exports = router;