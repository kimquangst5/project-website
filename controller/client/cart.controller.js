const Cart = require("../../models/cart.model")
const Product = require("../../models/product.model")
const priceNew = require("../../utils/price-new.util")
const mongoose = require("mongoose")

module.exports.cartInfo = async (req, res) => {
	
	const sortAndUpdateCart = async (req) => {
		const cartId = req.cookies.cardID;

		// Bước 1: Sắp xếp mảng products
		const sortedCart = await Cart.aggregate([{
				$match: {
					_id: cartId
				}
			},
			{
				$addFields: {
					sortedProducts: {
						$sortArray: {
							input: "$products",
							sortBy: {
								position: 1
							} // Sắp xếp giảm dần theo position
						}
					}
				}
			}
		]);

		// Bước 2: Cập nhật document với mảng đã sắp xếp
		if (sortedCart.length > 0) {
			const result = await Cart.updateOne({
				_id: cartId
			}, {
				$set: {
					products: sortedCart[0].sortedProducts
				}
			});

			return result;
		}

		return null;
	};

	// Sử dụng function
	const updatedCart = await sortAndUpdateCart(req);
	
	const carts = await Cart.findOne({
		_id: req.cookies.cardID
	})
	const productsCart = await Promise
		.all(carts.products
			.map(async (it) => {
				let product = await Product
					.findOne({
						_id: it.productId
					})
					.select('-description')
				product.quanlityProduct = it.stock
				return product
			}))

		priceNew(productsCart)

	// console.log(productsCart)


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
		const positionCart = await Cart.findOne({
			_id: cardID
		});
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
			data.position = parseInt(positionCart.products.length + 1)
			await Cart.updateOne({
				_id: cardID
			}, {
				$push: {
					products: data,
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
	const {
		id
	} = req.params;
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