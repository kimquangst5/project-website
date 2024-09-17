const homeRoute = require('./home.route');
const productRoute = require('./product.route');
const searchRoute = require("./search.route")
const ortherRoute = require("./order.route")
const categoryMiddlewares = require("../../middlewares/client/category.middlewares")
const cartMiddlewares = require("../../middlewares/client/cart.middlewares")

module.exports.index = (app) => {
	app.use(categoryMiddlewares.category)
	app.use(cartMiddlewares.cart)

     app.use('/',homeRoute);
     app.use('/product', productRoute);
     app.use('/tim-kiem', searchRoute);
     app.use('/order', ortherRoute);
};