const Product = require("../../models/product.model")
const unidecode = require('unidecode');
const priceNew = require('../../utils/price-new.util');

module.exports.index = async (req, res) => {
	console.log(req.params)
	const type = req.params.type
	let find = {
		deleted: false,
		status: "active"
	}
	let key = req.query.key
	let keySlug = key.trim().replace(/\s+/g, '-')
	keySlug = unidecode(keySlug)

	const regexTitle = new RegExp(key, 'i');
	const regexSlug = new RegExp(keySlug, 'i');
	const products = await Product
		.find({
			$or: [{
					title: regexTitle
				},
				{
					slug: regexSlug
				}
			],
			deleted: false,
			status: "active"
		})
		.sort({
			position: "desc"
		})
		// .select("title price discountPercentage thumbnail")

	priceNew(products)
	products.key = req.query.key.trim()
	console.log(products)
	if (type == 'result') {
		res.render("client/pages/search/index.pug", {
			pageTitle: "Tìm kiếm",
			products: products,
			key: products.key
		})
	}
	else{
		res.json({
			code: 200,
			products: products
		})
	}

};