const mongoose = require('mongoose');

const { Schema } = mongoose

const forgotPasswordSchema = new Schema({
	email: String,
	otp: Number,
	expireAt: { 
		type: Date,
		expires: 0
	}
}, {
	timestamps: true
});

const ForgotPassword = mongoose.model('ForgotPassword', forgotPasswordSchema, 'fogot-password');

module.exports = ForgotPassword;