

const express = require('express');
const router = express.Router();
const controller = require('../../controller/admin/upload.controller');
const multer = require('multer')
const upload = multer()
const uploadCloudMiddleWares = require('../../middlewares/admin/uploadCloud.middlewares');

router.post(
	'/',
	upload.single('file'),
	uploadCloudMiddleWares.uploadSingle,
	controller.index
);

module.exports = router