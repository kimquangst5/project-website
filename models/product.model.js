const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater')
mongoose.plugin(slug)

const { Schema } = mongoose

const productShema = new Schema({
	title: String,
	product_category_id: String,
	description: String,
	price: Number,
	discountPercentage: Number,
	stock: Number,
	nameImage: String,
	thumbnail: {
		type: Array
	},
	status: String,
	featured: String,
	position: Number,
	createdBy: String,
	updatedBy: String,
	deletedBy: String,
	deleted: {
		type: Boolean,
		default: false
	},
	slug: {
		type: String,
		slug: "title",
		unique: true
	},
}, {
	timestamps: true
});

const Product = mongoose.model('Product', productShema, 'products');

module.exports = Product