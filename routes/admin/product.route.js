const express = require('express');
const router = express.Router();
const controller = require('../../controller/admin/product.controller');

const multer = require('multer')
const upload = multer()
const uploadCloudMiddleWares = require('../../middlewares/admin/uploadCloud.middlewares');
const validate = require('../../validate/admin/product.validate')
const checkLogInMiddleWares = require('../../middlewares/admin/checklogin.middlewares')
router.get(
	'/',
	checkLogInMiddleWares,
	controller.index);

router.patch('/change-status/:status/:id', controller.changeStatus);

router.patch('/change-multi', controller.changeMulti);

router.patch('/delete/:id', controller.delete);

// router.get('/trash', controller.trash);

// router.patch('/trash/:id', controller.trashRestore);

// router.delete('/trash/:id/:nameImage', controller.trashPermanetlyDelete);

router.patch('/change-multi-restore', controller.changeMultiRestore);

router.patch('/change-position/:id', controller.changePosition);

router.get('/create', controller.create);

router.post(
	'/create',
	// upload.single('thumbnail'),
	upload.fields([{ name: 'thumbnail', maxCount: 20 }]),
	uploadCloudMiddleWares.uploadFields,
	// uploadCloudMiddleWares.uploadSingle,
	validate.createPost,
	controller.createPost
);

router.get('/edit/:id', controller.edit);

router.patch(
	'/edit/:id',
	upload.fields([{ name: 'thumbnail', maxCount: 20 }]),
	uploadCloudMiddleWares.uploadFields,
	// upload.single('thumbnail'),
	// uploadCloudMiddleWares.uploadSingle,
	validate.createPost,
	controller.editPatch
);

router.get('/detail/:id', controller.detail);

router.patch('/display-product', controller.displayProduct);


module.exports = router;