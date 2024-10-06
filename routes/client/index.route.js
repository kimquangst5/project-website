const homeRoute = require('./home.route');
const productRoute = require('./product.route');
const searchRoute = require("./search.route")
const cartRoute = require("./cart.route")
const paymentRoute = require("./payment.route")
const userRoute = require("./user.route")
const roomsChatRoute = require("./roomChat.router")
const chatRoute = require("./chat.route")
const categoryMiddlewares = require("../../middlewares/client/category.middlewares")
const cartMiddlewares = require("../../middlewares/client/cart.middlewares")
const userMiddlewares = require("../../middlewares/client/user.middlewares")
const settingiddlewares = require("../../middlewares/client/setting.middlewares")

module.exports.index = (app) => {
	// app.use(require('express-status-monitor')());
	app.use(cartMiddlewares.cart)
	app.use(categoryMiddlewares.category)
	app.use(userMiddlewares.user)
	app.use(settingiddlewares.InfoWebsite)
     app.use('/',homeRoute);
     app.use('/product', productRoute);
     app.use('/tim-kiem', searchRoute);
     app.use('/order', cartRoute);
     app.use('/payment', paymentRoute);
     app.use('/member', userRoute);
     app.use('/chat', userMiddlewares.requireAuth, chatRoute);
     app.use('/roomchat', userMiddlewares.requireAuth, roomsChatRoute);
};