const User = require("../../models/user.model");
const HeaderMenu = require('../../models/header-menu.model.js')

module.exports.user = async (req, res, next) => {
	const headerMenu = await HeaderMenu.find({});
	res.locals.headerMenu = headerMenu
	if (req.cookies.tokenUser) {
		const user = await User.findOne({
			tokenUser: req.cookies.tokenUser
		})
		if (user && req.cookies.tokenUser) {
			res.locals.infoUser = user
		}
	}

	next();
};

module.exports.requireAuth = async (req, res, next) => {
	if (!req.cookies.tokenUser) {
		req.flash("error", "Vui lòng đăng nhập!")
		res.redirect('/member/login');
		return;
	}
	const user = await User.findOne({
		tokenUser: req.cookies.tokenUser
	})
	if (!user) {
		res.redirect('/member/login');
		return;
	}

	next();
};