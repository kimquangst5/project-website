const mongoose = require('mongoose');

const {
	Schema
} = mongoose

const orderShema = new Schema({
	userInfo: {
		fullName: String,
		phone: String,
		address: String
	},
	products: [
		{
			productId: String,
			price: Number,
			discountPercentage: Number,
			quantity: Number
		}
	],
	methodPay: String,
	note: String,
	deleted: {
		type: Boolean,
		default: false
	}
}, {
	timestamps: true
});

const Order = mongoose.model('Order', orderShema, 'orders');

module.exports = Order;