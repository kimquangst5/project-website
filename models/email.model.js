const mongoose = require('mongoose');

const { Schema } = mongoose

const emailShema = new Schema({
	fullName: String,
	from: String,
	title: String,
	content: String
}, {
	timestamps: true
});

const Email = mongoose.model('Email', emailShema, 'email');

module.exports = Email;