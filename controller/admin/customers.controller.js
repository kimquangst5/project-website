require('dotenv').config();
const Account = require("../../models/account.model");

// Md5 mã hóa password
const md5 = require('md5');
const User = require('../../models/user.model');

module.exports.index = async (req, res) => {
	try {
		const customers = await User.find({
			deleted: false
		})
		res.render("admin/pages/customer/index.pug", {
			pageTitle: 'Kim Quang | Đăng nhập',
			customers: customers
		})
	} catch (error) {
		res.redirect('back')
	}
};