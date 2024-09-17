const Cart = require('../../models/cart.model')
module.exports.cart = async (req, res, next)=> {
	if(!req.cookies.cardID){
		const cart = new Cart();
		await cart.save();
		console.log(cart.id)
		res.cookie('cardID', cart.id, { expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000)}) //số 1 là số ngày
	}
	next();
};