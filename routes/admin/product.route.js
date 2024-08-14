const express = require('express');
const router = express.Router();
const controller = require('../../controller/admin/product.controller');

const multer = require('multer')
const upload = multer()

const uploadCloudMiddleWares = require('../../middlewares/admin/uploadCloud.middlewares');

const validate = require('../../validate/admin/product.validate')


router.get('/', controller.index);

router.patch('/change-status/:status/:id', controller.changeStatus);

router.patch('/change-multi', controller.changeMulti);

router.patch('/delete/:id', controller.delete);

router.get('/trash', controller.trash);

router.patch('/trash/:id', controller.trashRestore);

router.delete('/trash/:id/:nameImage', controller.trashPermanentlyDelete);

router.patch('/change-multi-restore', controller.changeMultiRestore);

router.patch('/change-position/:id', controller.changePosition);

router.get('/create', controller.create);

router.post(
	'/create',
	upload.single('thumbnail'),
	uploadCloudMiddleWares.uploadSingle,
	validate.createPost,
	controller.createPost
);

router.get('/edit/:id', controller.edit);

router.patch(
	'/edit/:id',
	upload.single('thumbnail'),
	uploadCloudMiddleWares.uploadSingle,
	validate.createPost,
	controller.editPatch
);

router.get('/detail/:id', controller.detail);

module.exports = router;