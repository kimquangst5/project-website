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
	sex: String,
	status: {
		type: String,
		default: "active"
	},
	deleted: {
		type: Boolean,
		default: false
	},
	acceptFriends: Array, // Lời mời đã nhận
	requestFriends: Array // Lời mời đã gửi
}, {
	timestamps: true
});

const User = mongoose.model('User', userShema, 'users');

module.exports = User;