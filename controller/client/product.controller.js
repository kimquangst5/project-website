const Product = require('../../models/product.model');
const ProductCategory = require("../../models/product-category.model")
module.exports.index = async (req, res) => {


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

module.exports.detail = async (req, res) => {
	const product = await Product.findOne({
		slug: req.params.slug,
		deleted: false,
		status: 'active'
	})

	if (product) {
		console.log(product.product_category_id)
		const titleCategory = await ProductCategory.findOne({
			_id: product.product_category_id,
			deleted: false,
			status: 'active',
		})
		product.priceNew = product.price - (product.price * product.discountPercentage) / 100
		product.priceNew = product.priceNew.toFixed(0);
		product.priceNew = parseInt(product.priceNew / 1000)
		if (product.priceNew % 1000 <= 100) {
			product.priceNew = parseInt(product.priceNew / 1000) - 1
			product.priceNew = (1000 * product.priceNew + 990) * 1000
		} else {
			product.priceNew = product.priceNew * 1000
		}
		product.priceNew = [product.priceNew].toLocaleString('en-EN')
		
		product.priceOld = [product.price].toLocaleString('en-EN')

		res.render('client/pages/product/detail.pug', {
			pageTitle: 'Trang chi tiết sản phẩm',
			product: product,
			titleCategory: titleCategory
		})
	} else {
		res.redirect('/product')
	}

}

module.exports.category = async (req, res) => {
	const {
		category
	} = req.params
	const slugProductCategory = await ProductCategory.findOne({
		slug: category
	})
	const id = slugProductCategory.id


	const subCategory = [];
	const getSubCategory = async (id) => {
		const sub = await ProductCategory.find({
			parent_id: id,
			status: "active",
			deleted: false
		})
		for (const it of sub) {
			subCategory.push(it.id)
			await getSubCategory(it.id)
		}
	};
	await getSubCategory(id);
	const productsCategory = await Product
		.find({
			product_category_id: {
				$in: [
					id,
					...subCategory,
				]
			},
			status: "active",
			deleted: false
		})
		.select("-description")
		.sort({
			position: "desc"
		})
		.limit(4)
	for (const it of productsCategory) {
		it.priceNew = it.price - (it.price * it.discountPercentage) / 100
		it.priceNew = it.priceNew.toFixed(0);
		it.priceNew = parseInt(it.priceNew / 1000)
		if (it.priceNew % 1000 <= 100) {
			it.priceNew = parseInt(it.priceNew / 1000) - 1
			it.priceNew = (1000 * it.priceNew + 990) * 1000
		} else {
			it.priceNew = it.priceNew * 1000
		}
		it.priceNew = [it.priceNew].toLocaleString('en-EN')


	}
	for (const it of productsCategory) {
		it.priceOld = [it.price].toLocaleString('en-EN')
	}

	res.render('client/pages/home/index.pug', {
		pageTitle: 'Trang chủ',
		productsCategory: productsCategory,
		titleCategory: slugProductCategory.title
	})

}
