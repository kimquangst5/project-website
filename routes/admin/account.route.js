const express = require('express');
const router = express.Router();
const controller = require('../../controller/admin/accounts.controller');

router.get('/', controller.index);

router.get('/create', controller.create);

router.post('/create', controller.createPost);

router.get('/edit/:id', controller.edit);

router.patch('/edit/:id', controller.editPatch);

router.patch('/delete/:id', controller.delete);

module.exports = router;