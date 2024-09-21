const mongoose = require('mongoose');

const { Schema } = mongoose

const userShema = new Schema({
	useName: String,
	fullName: String,
	email: String,
	password: String,
	confirmPassword: String,
	phone: String,
	tokenUser: String,
	birthday: Date,
	status: {
		type: String,
		default: "active"
	},
	deleted: {
		type: Boolean,
		default: false
	},
}, {
	timestamps: true
});

const User = mongoose.model('User', userShema, 'users');

module.exports = User;