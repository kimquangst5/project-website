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
	avatar: {
		type: String,
		default: 'https://res.cloudinary.com/djp6njpi7/image/upload/v1728882513/photo_ncmgdo.png'
	},
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
	friendsList: Array,
	acceptFriends: Array, // Lời mời đã nhận
	requestFriends: Array // Lời mời đã gửi
}, {
	timestamps: true
});

const User = mongoose.model('User', userShema, 'users');

module.exports = User;