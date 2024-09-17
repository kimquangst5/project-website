const Product = require("../../models/product.model")

module.exports.index = async (req, res) => {
	let find = {
		deleted: false,
		status: "active"
	}
	if(req.query.key){
		const regex = new RegExp(req.query.key, 'i')
		find.title = regex
	}

	

	const products = await Product
		.find(find)
		.sort({
			position: "desc"
		})
		.select("-description")

		for (const it of products) {
			it.priceNew = it.price - (it.price * it.discountPercentage) / 100
			it.priceNew = it.priceNew.toFixed(0);
			it.priceNew = parseInt(it.priceNew / 1000)
			if(it.priceNew % 1000 <= 100){
				it.priceNew = parseInt(it.priceNew / 1000) - 1
				it.priceNew = (1000 * it.priceNew + 990) * 1000
			}
			else{
				it.priceNew = it.priceNew * 1000
			}
			it.priceNew = [it.priceNew].toLocaleString('en-EN')
			
	
		}
		for (const it of products) {
			it.priceOld = [it.price].toLocaleString('en-EN')
		}
		products.key = req.query.key
	res.render("client/pages/search/index.pug", {
		pageTitle: "Tìm kiếm",
		products: products,
		key: products.key
	})
};