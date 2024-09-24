const express = require('express');
const router = express.Router();
const controller = require('../../controller/admin/order.controller');

router.get('/', controller.index);

router.get('/edit/:id', controller.edit);

router.patch('/change-status-payment-method/:status/:id', controller.changeStatusPaymentMethod);



module.exports = router;