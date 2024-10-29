const express = require('express');
const router = express.Router();
const controller = require('../../controller/admin/interface.controller');
const configRoute = require("./interface/config/config.route")
const customizeRoute = require("./interface/customize/customize.route")

router.get('/dashboard', controller.index);

router.use('/config', configRoute);

router.use('/customize', customizeRoute);


// router.get('/customize', controller.edit);

// router.get('/css', controller.editBoxProduct);

// router.patch('/javascript', controller.editBoxProductPatch);

module.exports = router;