require('dotenv').config();
const Account = require("../../models/account.model");

// Md5 mã hóa password
const md5 = require('md5');

module.exports.index = async (req, res) => {
	res.render("admin/pages/auth/index.pug", {
		pageTitle: 'Kim Quang | Đăng nhập',
	})
};

module.exports.login = async (req, res) => {
	try {
		req.body.password = md5(req.body.password)
		const {
			usename,
			password
		} = req.body;
		let check = false;
		const accounts = await Account.find({
			deleted: false
		}).select('useName && password && status && token');
		let token = '';
		for (const record of accounts) {
			if (record.useName == usename && record.password == password && record.status == 'active') {
				check = true;
				token = record.token
				break;
			}
		}
		if (token != '' && check == true) {
			res.cookie('token', token, {
				expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000)
			}) //số 1 là số ngày
			res.json({
				code: 200
			})
		} else {
			res.json({
				code: 400
			})

		}
	} catch (error) {
		res.json({
			code: 400
		})
	}
};

module.exports.logout = async (req, res) => {
	try {
		const admin = process.env.admin
		res.clearCookie('token')
		res.json({
			code: 200,
			message: `/${admin}`
		})
	} catch (error) {
		res.json({
			code: 400,
		})
	}
};