const Cart = require('../../models/cart.model')
module.exports.cart = async (req, res, next) => {
	if (!req.cookies.cardID) {
		const cart = new Cart();
		await cart.save();
		res.cookie('cardID', cart.id, {
			expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000)
		}) //số 1 là số ngày
		next();
	} else {
		try {
			const cart = await Cart.findOne({
				_id: req.cookies.cardID
			})
			res.locals.cartProductsLength = cart.products.length
			next();
		} catch (error) {
			res.clearCookie(cardID)
			const cart = new Cart();
			await cart.save();
			res.cookie('cardID', cart.id, {
				expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000)
			}) //số 1 là số ngày
			next();
		}

	}
};