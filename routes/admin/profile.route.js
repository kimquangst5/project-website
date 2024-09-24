const express = require('express');
const router = express.Router();
const controller = require('../../controller/admin/my-profile.cotroller');
const multer = require('multer')
const upload = multer()
const uploadCloudMiddleWares = require('../../middlewares/admin/uploadCloud.middlewares');
router.get('/', controller.index)

router.patch(
	'/update/:id',
	upload.single('avatar'),
	uploadCloudMiddleWares.uploadSingle,
	controller.updatePatch
);

module.exports = router