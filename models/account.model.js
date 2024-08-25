const mongoose = require('mongoose');

const { Schema } = mongoose

const accountShema = new Schema({
	useName: String,
	fullName: String,
	email: String,
	password: String,
	confirmPassword: String,
	phone: String,
	role_id: String,
	roleTitle: String,
	token: String,
	birthday: Date,
	roleTitle: String,
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

const Account = mongoose.model('Account', accountShema, 'accounts');

module.exports = Account;