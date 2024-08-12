const dashboardRoute = require('./dashboard.route');
const productRoute = require('./product.route');

module.exports.index = (app) => {
	const admin = process.env.admin
	app.use(`/${admin}`, dashboardRoute);
	app.use(`/${admin}/product`, productRoute);
};