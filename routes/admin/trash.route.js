const express = require('express');
const router = express.Router();
const controller = require('../../controller/admin/trash.controller');
const trashProduct = require('./trash/trash.product.route')
const trashProductCategory = require('./trash/trash.product-category.route')
const trashRoles = require('./trash/trash.roles.route')
const trashAccount = require('./trash/trash.account.route')
const checkLogInMiddleWares = require('../../middlewares/admin/checklogin.middlewares')

router.get('/', controller.index);
router.use(`/product`, trashProduct);
router.use(`/product-category`, trashProductCategory);
router.use(`/roles`, trashRoles);
router.use(`/accounts`, checkLogInMiddleWares, trashAccount);
// router.get('/article', controller.trashArticle);
// router.get('/product-category', controller.trashProductCategory);

module.exports = router;