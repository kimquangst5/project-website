const express = require("express");
const router = express.Router();
const controller = require("../../controller/client/cart-info.controller")

router.get('/cart-info', controller.index)

router.post('/cart-add/:id', controller.addPost)

module.exports = router