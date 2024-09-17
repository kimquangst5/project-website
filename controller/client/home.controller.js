const Product = require("../../models/product.model")

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
	for (const it of featuredProducts) {
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
	for (const it of featuredProducts) {
		it.priceOld = [it.price].toLocaleString('en-EN')
	}

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
		for (const it of newproducts) {
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
		for (const it of newproducts) {
			it.priceOld = [it.price].toLocaleString('en-EN')
		}
	res.render('client/pages/home/index.pug', {
		pageTitle: 'Trang chủ',
		featuredProducts: featuredProducts,
		newproducts: newproducts
	})
};