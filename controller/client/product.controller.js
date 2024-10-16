const Product = require('../../models/product.model');
const ProductCategory = require("../../models/product-category.model")
const priceNew = require("../../utils/price-new.util")
module.exports.index = async (req, res) => {
	try {
		let find = {
			deleted: false
		}
	
		const totalProduct = await Product.countDocuments({
			deleted: false,
			status: 'active'
		});
		let pagination = {
			current: 1,
			limit: 8,
			skip: 0
		}
		pagination.totalPage = Math.ceil(totalProduct / pagination.limit)
		if (req.query.page) {
			if (parseInt(req.query.page) <= pagination.totalPage && parseInt(req.query.page) >= 1) {
				pagination.current = parseInt(req.query.page)
				pagination.skip = (parseInt(req.query.page) - 1) * pagination.limit
			}
	
		}
	
		const product = await Product
			.find(find)
			.sort({
				position: 'desc'
			})
			.limit(pagination.limit)
			.skip(pagination.skip)
	
		priceNew(product)
	
	
			console.log(pagination)
		res.render('client/pages/product/index.pug', {
			pageTitle: 'Danh sách sản phẩm',
			product: product,
			pagination: pagination
	
		})
	} catch (error) {
		res.redirect('back')
	}
	
};

module.exports.detail = async (req, res) => {
	const product = await Product.findOne({
		slug: req.params.slug,
		deleted: false,
		status: 'active'
	})

	if (product) {
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
		slug: category,
		deleted: false,
		status: 'active',
	}).select('id title')
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
	console.log(req.query)

	let sort = {};
	if(req.query.sortKey && req.query.sortValue){
		sort[req.query.sortKey] = req.query.sortValue
	}
	else{
		sort.position = 'desc'
	}
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
		.sort(sort)
		// .limit(4)
	priceNew(productsCategory)


	res.render('client/pages/product-category/index.pug', {
		pageTitle: 'Sản phẩm theo danh mục',
		productsCategory: productsCategory,
		titleCategory: slugProductCategory
	})

}
