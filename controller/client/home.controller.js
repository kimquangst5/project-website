const Product = require("../../models/product.model")
const priceNew = require("../../utils/price-new.util")

// [GET] /
module.exports.index = async (req, res) => {
	const featuredProducts = await Product
		.find({
			deleted: false,
			status: "active",
			featured: "active"
		})
		.sort({
			position: "desc"
		})
		.select("-description")
		.limit(6)

	priceNew(featuredProducts)

	const newproducts = await Product
		.find({
			deleted: false,
			status: "active",
		})
		.sort({
			position: "desc"
		})
		.select("-description")
		.limit(6)
		priceNew(newproducts)
	res.render('client/pages/home/index.pug', {
		pageTitle: 'Trang chủ',
		featuredProducts: featuredProducts,
		newproducts: newproducts
	})
};