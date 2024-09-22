require('dotenv').config();
const InfoWebsite = require('../../models/info-website.model');

module.exports.InfoWebsite = async (req, res, next) => {
	const infoWebsite = await InfoWebsite.find({});
	res.locals.infoWeb = infoWebsite[0];
	next();
};