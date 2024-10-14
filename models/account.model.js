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

	avatar: {
		type: String,
		default: 'https://res.cloudinary.com/djp6njpi7/image/upload/v1728882513/photo_ncmgdo.png'
	},

	aboutMe: String,

	instagram: String,
	facebook: String,
	twitter: String,
	linkedin: String,
	skype: String,
	github: String,
	gmail: String,
	zalo: String,

	roleTitle: String,
	createdBy: String,
	deletedBy: String,
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