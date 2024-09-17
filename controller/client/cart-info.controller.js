const Cart = require("../../models/cart.model")

module.exports.index = (req, res) => {
	res.render("client/pages/orders/index.pug", {
		pageTitle: "Thông tin giỏ hàng"
	})
};

// [POST] /cart-add/:id
module.exports.addPost = async (req, res) => {
	const {
		id
	} = req.params
	req.body.quality = parseInt(req.body.quality)
	const cardID = req.cookies.cardID
	const data = {
		productId: id,
		stock: req.body.quality
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
				'products.$.stock': req.body.quality + check.stock
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
};