const express = require("express");
const router = express.Router();
const controller = require("../../controller/client/payment.controller")

router.get('/', controller.index)

router.post('/order', controller.payPost)


router.get('/success/:id', controller.success)

router.post('/method', controller.method)

module.exports = router