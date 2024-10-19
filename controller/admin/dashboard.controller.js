const Product = require("../../models/product.model")
const ProductCategory = require("../../models/product-category.model")
const Account = require("../../models/account.model")
const User = require("../../models/user.model")
const Role = require("../../models/role.model")
const Cart = require("../../models/cart.model")
const Order = require("../../models/orders.model")

module.exports.index = async (req, res) => {
	try {
		const dashboard = {
			product: {
				total: await Product.countDocuments(),
				active: await Product.countDocuments({
					status: "active"
				}),
				inactive: await Product.countDocuments({
					status: "inactive"
				}),
				deleted: await Product.countDocuments({
					deleted: true
				})
			},
			product_category: {
				total: await ProductCategory.countDocuments(),
				active: await ProductCategory.countDocuments({
					status: "active"
				}),
				inactive: await ProductCategory.countDocuments({
					status: "inactive"
				}),
				deleted: await ProductCategory.countDocuments({
					deleted: true
				})
			},
			account: {
				total: await Account.countDocuments(),
				active: await Account.countDocuments({
					status: "active"
				}),
				inactive: await Account.countDocuments({
					status: "inactive"
				}),
				deleted: await Account.countDocuments({
					deleted: true
				})
			},
			user: {
				total: await User.countDocuments(),
				active: await User.countDocuments({
					status: "active"
				}),
				inactive: await User.countDocuments({
					status: "inactive"
				}),
				deleted: await User.countDocuments({
					deleted: true
				})
			},
			role: {
				total: await Role.countDocuments(),
				deleted: await Role.countDocuments({
					deleted: true
				})
			},
			cart: {
				total: await Cart.countDocuments(),
				empty: await Cart.countDocuments({
					products: []
				})
			},
			order: {
				total: await Order.countDocuments(),
				cash: await Order.countDocuments({
					methodPay: 'cash'
				}),
				transfer: await Order.countDocuments({
					methodPay: 'transfer'
				}),
			}
		}

		res.render('admin/pages/main/index.pug', {
			pageTitle: 'Trang chủ Admin',
			dashboard: dashboard
		})
	} catch (error) {
		res.redirect('back');
	}
};