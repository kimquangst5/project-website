const Product = require('../../models/product.model');

module.exports.index = async (req, res)=> {
	

	const product = await Product
	.find({
		deleted: false
	})
	.sort({
		position: 'desc'
	});
	
	for (const it of product) {
		it.priceNew = it.price - (it.price * it.discountPercentage) / 100
		it.priceNew = it.priceNew.toFixed(2);
	}

	
	
	res.render('client/pages/product/index.pug', {
		pageTitle: 'Trang sản phẩm',
		product: product

	})
};

module.exports.detail = async (req, res)=> {
	const product = await Product.findOne({
		slug: req.params.slug,
		deleted: false,
		status: 'active'
	})

	if(product){
		res.render('client/pages/product/detail.pug', {
			pageTitle: 'Trang chi tiết sản phẩm',
			product: product
		})
	}
	else{
		res.redirect('/product')
	}
	
}