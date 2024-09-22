const mongoose = require('mongoose');

const { Schema } = mongoose

const infoWebsiteSchema = new Schema({
	nameWeb: String,
	nameCompany: String,
	hotline: String,
	phone: String,
	email: String,
	address: String,
	copyRight: String,
	map: String,
	logo: String,
}, {
	timestamps: true
});

const InfoWebsite = mongoose.model('InfoWebsite', infoWebsiteSchema, 'info-website');

module.exports = InfoWebsite;