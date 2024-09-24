require('dotenv').config();
const InfoWebsite = require('../../models/info-website.model');
const InterfaceBoxProduct = require('../../models/interface.model');


module.exports.InfoWebsite = async (req, res, next) => {
	const infoWebsite = await InfoWebsite.find({});
	res.locals.infoWeb = infoWebsite[0];

	const boxProduct = await InterfaceBoxProduct.find({});
	res.locals.BOX = boxProduct[0];
	next();
};