const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater')
mongoose.plugin(slug)

const { Schema } = mongoose

const recapchav3Shema = new Schema({
	type: String,
	project_id: String,
	private_key_id: String,
	private_key: String,
	client_email: String,
	client_id: String,
	auth_uri: String,
	token_uri: String,
	auth_provider_x509_cert_url: String,
	client_x509_cert_url: String,
	universe_domain: String,
	
}, {
	timestamps: true
});

const Recapcha_V3 = mongoose.model('Recapcha_V3', recapchav3Shema, 'reCapcha-V3');

module.exports = Recapcha_V3