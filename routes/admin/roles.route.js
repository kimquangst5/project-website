const express = require('express');
const router = express.Router();
const controller = require('../../controller/admin/roles.controller');
const checkLogInMiddleWares = require('../../middlewares/admin/checklogin.middlewares')

// const validate = require('../../validate/admin/roles.validate')

router.get('/', checkLogInMiddleWares, controller.index);

router.get('/create', checkLogInMiddleWares, controller.create);

router.post('/create', checkLogInMiddleWares, controller.createPost);

router.get('/edit/:id', checkLogInMiddleWares, controller.edit);

router.patch('/edit/:id', checkLogInMiddleWares, controller.editPatch);

router.get('/permissions', checkLogInMiddleWares, controller.permissions);

router.patch('/permissions', checkLogInMiddleWares, controller.permissionsPatch);

module.exports = router;