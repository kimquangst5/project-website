const express = require('express');
const router = express.Router();
const controller = require('../../controller/admin/accounts.controller');
const validate = require("../../validate/admin/accounts.valitate")
const validateChangePassword = require("../../validate/admin/accounts.change-password.valitate")
const validateChangeAdmin = require("../../validate/admin/account.admin.validate")
router.get('/', controller.index);

router.get('/create', controller.create);

router.post(
	'/create', 
	validate.createPost,
	controller.createPost);

router.get('/edit/:id', controller.edit);

router.patch(
	'/edit/:id',
	validate.editPost,
	controller.editPatch
);

router.patch(
	'/delete/:id',
	validateChangeAdmin.changeAdmin,
	controller.delete);

router.patch(
	'/change-status/:status/:id',
	validateChangeAdmin.changeAdmin,
	controller.changeStatus);

router.get('/change-password/:id', controller.changePassword);

router.patch(
	'/change-password/:id',
	validateChangePassword.createPost,
	controller.changePasswordPatch
);



module.exports = router;