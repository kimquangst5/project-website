const mongoose = require('mongoose');

const { Schema } = mongoose

const displayProductSchema = new Schema({
	total: Number,
	limit: Number
}, {
	timestamps: true
});

const DisplayProduct = mongoose.model('DisplayProduct', displayProductSchema, 'display-product');

module.exports = DisplayProduct;