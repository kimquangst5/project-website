const express = require("express");
const router = express.Router();
const controller = require("../../controller/client/cart.controller")

router.get('/cart-info', controller.cartInfo)

router.post('/cart-add/:id', controller.addPost)

router.get('/cart-delete/:id', controller.deletePatch);

router.patch('/cart-update', controller.updatePatch);

module.exports = router