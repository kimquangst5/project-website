const dashboardRoute = require('./dashboard.route');
const productRoute = require('./product.route');
const categoryRoute = require('./product-category.route');
const rolesRoute = require('./roles.route');
const settingRoute = require('./setting.route');
const accountRoute = require('./account.route');
const authRoute = require('./auth.route');
const trashRoute = require('./trash.route')
const myProfileRoute = require('./profile.route')
const articleRoute = require('./article.route')
const interfaceRoute = require('./interface.route')
const orderRoute = require('./order.route')
const customerRoute = require('./customer.route')
const uploadRoute = require('./upload.route')
const checkLogInMiddleWares = require('../../middlewares/admin/checklogin.middlewares')

module.exports.index = (app) => {
	const admin = process.env.admin
	app.use(`/${admin}/dashboard`, checkLogInMiddleWares, settingRoute);
	app.use(`/${admin}/product`, checkLogInMiddleWares, productRoute);
	app.use(`/${admin}/product-category`, checkLogInMiddleWares, categoryRoute);
	app.use(`/${admin}/roles`, checkLogInMiddleWares, rolesRoute);
	app.use(`/${admin}/main`, checkLogInMiddleWares, dashboardRoute);
	app.use(`/${admin}/accounts`, checkLogInMiddleWares, accountRoute);
	app.use(`/${admin}/trash`, checkLogInMiddleWares, trashRoute);
	app.use(`/${admin}/my-profile`, checkLogInMiddleWares, myProfileRoute);
	app.use(`/${admin}/articles`, checkLogInMiddleWares, articleRoute);
	app.use(`/${admin}/interface`, checkLogInMiddleWares, interfaceRoute);
	app.use(`/${admin}/order`, checkLogInMiddleWares, orderRoute);
	app.use(`/${admin}/customers`, checkLogInMiddleWares, customerRoute);
	app.use(`/${admin}/upload`, checkLogInMiddleWares, uploadRoute);
	app.use(`/${admin}`, authRoute);
};