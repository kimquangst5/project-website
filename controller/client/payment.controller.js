const Cart = require("../../models/cart.model")
const Product = require("../../models/product.model")
const Order = require("../../models/orders.model")
const priceNew = require("../../utils/price-new.util")

module.exports.index = async (req, res) => {
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
	res.render("client/pages/payment/index.pug", {
		pageTitle: "Thanh toán",
		carts: productsCart,
	})
};

module.exports.payPost = async (req, res) => {
	const data = {
		userInfo: {
			fullName: req.body.fullName,
			phone: req.body.phone,
			address: req.body.address
		},
		products: []
	}
	const carts = await Cart.findOne({
		_id: req.cookies.cardID
	})
	for (const it of carts.products) {
		const product = await Product.findOne({
			_id: it.productId,
			status: "active",
			deleted: false
		})
		const items = {
			productId: it.productId,
			price: product.price,
			discountPercentage: product.discountPercentage,
			quantity: it.stock
		}
		data.products.push(items)
	}
	data.methodPay = req.body.methodPay
	data.note = req.body.note
	const newOrder = new Order(data)
	await newOrder.save();

	await Cart.updateOne({
		_id: req.cookies.cardID
	}, {
		products: []
	})
	req.flash('success', 'Đặt hàng thành công!!!')
	res.redirect(`/payment/success/${newOrder.id}`)
}

module.exports.success = async (req, res) => {
	const {
		id
	} = req.params;
	const order = await Order.findOne({
		_id: id
	})
	for (const it of order.products) {
		const product = await Product.findOne({
			_id: it.productId,
		})
		it.title = product.title
		it.thumbnail = product.thumbnail
	}
	priceNew(order.products)
	order.total_price = 0
	for (const it of order.products) {
		it.priceNew = it.price - (it.price * it.discountPercentage) / 100
		it.priceNew = it.priceNew.toFixed(0);
		it.priceNew = parseInt(it.priceNew / 1000)
		if (it.priceNew % 1000 <= 100) {
			it.priceNew = parseInt(it.priceNew / 1000) - 1
			it.priceNew = (1000 * it.priceNew + 990) * 1000
		} else {
			it.priceNew = it.priceNew * 1000
		}
		it.priceNew = it.priceNew * it.quantity
		order.total_price += it.priceNew
		it.priceNew = [it.priceNew].toLocaleString('en-EN')
	}
	order.total_price = [order.total_price].toLocaleString('en-EN')

	res.render("client/pages/payment/success.pug", {
		pageTitle: "Biên lai đơn hàng",
		order: order
	})
}

module.exports.method = async (req, res) => {
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
	res.render("client/pages/payment/method.pug", {
		pageTitle: "Tiến hành thanh toán",
		carts: productsCart,
		inforUser: req.body
	})
}