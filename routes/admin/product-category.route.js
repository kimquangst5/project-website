const express = require('express');
const router = express.Router();
const controller = require('../../controller/admin/product-category.controller');

const multer = require('multer')
const upload = multer()
const uploadCloudMiddleWares = require('../../middlewares/admin/uploadCloud.middlewares');
const validate = require('../../validate/admin/product-category.validate')

router.get('/', controller.index);

router.get('/create', controller.create);

router.post(
	'/create',
	upload.single('thumbnail'),
	uploadCloudMiddleWares.uploadSingle,
	validate.createPost,
	controller.createPost
);

router.patch('/delete/:id', controller.deletePatch);

router.get('/edit/:id', controller.edit);

router.patch('/edit/:id',
	upload.single('thumbnail'),
	uploadCloudMiddleWares.uploadSingle,
	validate.createPost,
	controller.editPatch
);

router.patch(`/change-status/:status/:id`, controller.changeStatus);

router.get(`/detail/:id`, controller.detail);



module.exports = router;