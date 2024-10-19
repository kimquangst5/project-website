const express = require('express');
const router = express.Router();
const controller = require('../../controller/admin/roles.controller');
const checkLogInMiddleWares = require('../../middlewares/admin/checklogin.middlewares')

// const validate = require('../../validate/admin/roles.validate')

router.get('/', controller.index);

router.get('/create', controller.create);

router.post('/create', controller.createPost);

router.get('/edit/:id', controller.edit);

router.patch('/edit/:id', controller.editPatch);

router.patch('/delete/:id', controller.deletePatch);

router.get('/permissions', controller.permissions);

router.patch('/permissions', controller.permissionsPatch);

module.exports = router;