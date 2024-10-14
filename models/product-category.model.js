const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater')
mongoose.plugin(slug)

const { Schema } = mongoose

const productCategoryShema = new Schema({
	title: String,
	parent_id: {
		type: String,
		default: ''
	},
	description: String,
	thumbnail: {
		type: String,
		default: 'https://res.cloudinary.com/djp6njpi7/image/upload/v1728882513/photo_ncmgdo.png'
	},
	status: String,
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

const ProductCategory = mongoose.model('ProductCategory', productCategoryShema, 'product-category');

module.exports = ProductCategory