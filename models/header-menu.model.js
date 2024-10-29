const mongoose = require('mongoose');

const { Schema } = mongoose

const headerMenuSchema = new Schema({
	title: String,
	link: String,
	target: {
		type: String,
		default: '_self'
	},
}, {
	timestamps: true
});

const HeaderMenu = mongoose.model('HeaderMenu', headerMenuSchema, 'header-menu');

module.exports = HeaderMenu;