

const express = require('express');
const router = express.Router();
const controller = require('../../controller/admin/general-setting.controller');
const multer = require('multer')
const upload = multer()
const uploadCloudMiddleWares = require('../../middlewares/admin/uploadCloud.middlewares');

router.get('/', controller.index);

router.get('/website-info',
	upload.single('logo'),
	uploadCloudMiddleWares.uploadSingle,
	controller.infoWebsite
);

router.patch(
	'/website-info',
	upload.single('logo'),
	uploadCloudMiddleWares.uploadSingle,
	controller.infoWebsitePatch,
);

router.get('/email', controller.email)

router.patch('/email', controller.emailPatch)


router.get('/phone', controller.phone)

router.patch('/phone', controller.phonePatch)

router.get('/money', controller.money)

router.patch('/money', controller.moneyPatch)

module.exports = router;