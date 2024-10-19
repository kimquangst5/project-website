const Order = require("../../models/orders.model")
const Product = require("../../models/product.model")
const Money = require("../../models/money.model")
const moneySystem = require("../../utils/money-system.util")
const money = require("../../utils/money.util")
const moment = require('moment')
// [GET] /order
module.exports.index = async (req, res) => {
	try {
		const orders = await Order
			.find({})
			.sort({
				createdAt: 'desc'
			})
		for (const it of orders) {
			it.createdAtFormat = moment(it.createdAt).format('DD/MM/YY-HH:mm')
		}

		for (const item of orders) {
			item.products.totalPrice = 0
			for (const it of item.products) {
				it.priceNew = it.price - (it.price * it.discountPercentage) / 100
				it.priceNew = it.priceNew.toFixed(0);
				it.priceNew = parseInt(it.priceNew / 1000)
				if (it.priceNew % 1000 <= 100) {
					it.priceNew = parseInt(it.priceNew / 1000) - 1
					it.priceNew = (1000 * it.priceNew + 990) * 1000
				} else {
					it.priceNew = it.priceNew * 1000
				}
				item.products.totalPrice += it.priceNew * it.quantity
			}
			item.products.totalPrice = [item.products.totalPrice].toLocaleString('en-EN')
		}

		for (const item of orders) {
			// console.log(item.id)
			for (const it of item.products) {
				const products = await Product.findOne({
					_id: it.productId
				})
				// item.image.push(products.thumbnail)
				// console.log(item.image)
				it.idProduct = products.id
				it.thumbnail = products.thumbnail
				// console.log(products.slug)
			}
		}

		res.render('admin/pages/order/index.pug', {
			pageTitle: "Thông tin cá nhân",
			orders: orders
		})
	} catch (error) {
		res.redirect('back')
	}

};

// [GET] /order/edit/:id
module.exports.edit = async (req, res) => {
	try {
		const {
			id
		} = req.params
		const order = await Order.findOne({
			_id: id
		})
		order.totalPrice = 0
		for (const it of order.products) {
			it.priceNew = it.price - (it.price * it.discountPercentage) / 100
			it.priceNew = it.priceNew.toFixed(0);
			it.priceNew = parseInt(it.priceNew / 1000)
			// if (it.priceNew % 1000 <= 100) {
			// 	it.priceNew = parseInt(it.priceNew / 1000) - 1
			// 	it.priceNew = (1000 * it.priceNew + 990) * 1000
			// } else {
			// 	it.priceNew = it.priceNew * 1000
			// }
			it.priceNew = it.priceNew * 1000
			it.totalPrice = (it.priceNew * it.quantity)
			order.totalPrice += (it.priceNew * it.quantity)
			it.priceNew = [it.priceNew].toLocaleString('en-EN')
			it.priceOld = [it.price].toLocaleString('en-EN')
			it.totalPrice = [it.totalPrice].toLocaleString('en-EN')
			const product = await Product.findOne({
				_id: it.productId
			})
			it.image = product.thumbnail
			it.title = product.title
		}
	
		const moneys = await Money.find({});
		if (moneys[0].separator == 'comma') {
			order.totalPrice = moneySystem.phay(order.totalPrice)
		} else {
			order.totalPrice = moneySystem.cham(order.totalPrice)
		}
	
	
		res.render("admin/pages/order/edit.pug", {
			pageTitle: "Chỉnh sửa đơn hàng",
			order: order
		})
	} catch (error) {
		res.redirect('back');
	}
}

module.exports.changeStatusPaymentMethod = async (req, res) => {
	try {
		const {
			status,
			id
		} = req.params;
		await Order.updateOne({
			_id: id
		}, {
			methodPay: status
		})
		req.flash("success", "Thay đổi trang thái thành công!")
		res.json({
			code: 200
		})
	} catch (error) {
		res.redirect('back')
	}

}