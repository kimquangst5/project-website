const User = require("../../models/user.model");

module.exports.user = async (req, res, next) => {
	const user = await User.findOne({
		tokenUser: req.cookies.tokenUser
	})
	if(user){
		res.locals.user = user
	}
	next();
};