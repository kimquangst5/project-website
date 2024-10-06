const Cart = require('../../models/cart.model')
const priceNew = require("../../utils/price-new.util")
const Product = require("../../models/product.model")
module.exports.cart = async (req, res, next) => {
	try {
		if (!req.cookies.cardID) {
			const cart = new Cart();
			await cart.save();
			res.cookie('cardID', cart.id, {
				expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000)
			}) //số 1 là số ngày
		} else {
			try {
				const gio_hang = await Cart.findOne({
					_id: req.cookies.cardID
				})
				const products_gio_hang = await Promise.all(gio_hang.products.map(async (it) => {
					let product = await Product.findOne({
						_id: it.productId
					}).select('-description');
					product.quanlityProduct = it.stock
					return product
				}));
			
				priceNew(products_gio_hang)
				res.locals.shoopings_cart = products_gio_hang
			} catch (error) {
				if(req.cookies.cardID){
					res.clearCookie(req.cookies.cardID)
				}
				const cart = new Cart();
				await cart.save();
				res.cookie('cardID', cart.id, {
					expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000)
				}) //số 1 là số ngày
				res.redirect("/")
			}
			
		}
	} catch (error) {
		res.redirect('back')
	}
	
	next();
};