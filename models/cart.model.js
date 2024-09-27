const mongoose = require('mongoose');

const { Schema } = mongoose

const cartsSchema = new Schema({
	products:  [
		{
			productId: String,
			stock: Number,
			position: Number
		}
	]
}, {
	timestamps: true
});

const Cart = mongoose.model('Cart', cartsSchema, 'carts');

module.exports = Cart;