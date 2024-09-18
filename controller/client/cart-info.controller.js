const Cart = require("../../models/cart.model")
const Product = require("../../models/product.model")

module.exports.index = async (req, res) => {
	const carts = await Cart.findOne({
		_id: req.cookies.cardID
	})
	let data_array = {}
	const productsCart = await Promise.all(carts.products.map(async (it) => {
		let product = await Product.findOne({
			_id: it.productId
		}).select('-description');
		product.quanlityProduct = it.stock
		return product
	}));
	
	for (const it of productsCart) {
		it.priceNew = it.price - (it.price * it.discountPercentage) / 100
		it.priceNew = it.priceNew.toFixed(0);
		it.priceNew = parseInt(it.priceNew / 1000)
		if (it.priceNew % 1000 <= 100) {
			it.priceNew = parseInt(it.priceNew / 1000) - 1
			it.priceNew = (1000 * it.priceNew + 990) * 1000
		} else {
			it.priceNew = it.priceNew * 1000
		}
		it.newPrice = it.priceNew
		it.priceItem = [it.priceNew * it.quanlityProduct].toLocaleString('en-EN')
		it.priceNew = [it.priceNew].toLocaleString('en-EN')
		
	}
	for (const it of productsCart) {
		it.priceOld = [it.price].toLocaleString('en-EN')
	}


	res.render("client/pages/orders/index.pug", {
		pageTitle: "Thông tin giỏ hàng",
		carts: productsCart,
	})
};

// [POST] /cart-add/:id
module.exports.addPost = async (req, res) => {
	try {
		const {
			id
		} = req.params
		req.body.quanlity = parseInt(req.body.quanlity)
		const cardID = req.cookies.cardID
		const data = {
			productId: id,
			stock: req.body.quanlity
		}

		const carts = await Cart.findOne({
			_id: cardID
		})

		const check = carts.products.find(element => element.productId == id);
		if (check) {
			await Cart.updateOne({
				_id: cardID,
				'products.productId': id
			}, {
				'$set': {
					'products.$.stock': req.body.quanlity + check.stock
				}
			})
		} else {
			await Cart.updateOne({
				_id: cardID
			}, {
				$push: {
					products: data
				}

			})
		}



		res.json({
			code: 200
		})
	} catch (error) {
		res.json({
			code: 400
		})
	}
};