const Cart = require("../../models/cart.model")
const Product = require("../../models/product.model")
const priceNew = require("../../utils/price-new.util")

module.exports.cartInfo = async (req, res) => {
	const carts = await Cart.findOne({
		_id: req.cookies.cardID
	})
	const productsCart = await Promise.all(carts.products.map(async (it) => {
		let product = await Product.findOne({
			_id: it.productId
		}).select('-description');
		product.quanlityProduct = it.stock
		return product
	}));

	priceNew(productsCart)

	res.render("client/pages/cart/index.pug", {
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


module.exports.deletePatch = async (req, res) => {
	const { id } = req.params;
	const cardID = req.cookies.cardID
	const data = {
		productId: id,
	}
	await Cart.updateOne({
		_id: cardID
	}, {
		$pull: {
			products: data
		}
	})

	res.redirect('back')

}

module.exports.updatePatch = async (req, res) => {
	const cardID = req.cookies.cardID
	// const { id, quantity} = req.body
	const array = req.body.array
	console.log(array)

	// console.log(quantity)
	for (const it of array) {
		await Cart.updateOne({
			_id: cardID,
			'products.productId': it.id
		}, {
			'$set': {
				'products.$.stock': it.quantity
			}
		})
	}
	req.flash("success", "Cập nhật giỏ hàng thành công!")
	res.json({
		code: 200
	})

}