const Account = require('../../models/account.model')
const Role = require('../../models/role.model')

// Md5 mã hóa password
const md5 = require('md5');
const jwt = require('jsonwebtoken'); // tạo token
const crypto = require('crypto');
const { Script } = require('vm');

require('dotenv').config();

// [GET] /admin/accounts
module.exports.index = async (req, res) => {
	try {
		const accounts = await Account.find({
			deleted: false
		})
		const roles  = await Role.find({
			deleted: false
		})
		accounts.forEach(it => {
			roles.forEach(item => {
				if(it.role_id == item.id){
					it.roleTitle = item.title
				}
			});
		});
	
		res.render("admin/pages/accounts/index.pug", {
			pageTitle: 'Trang danh sách tài khoản',
			header: 'Danh sách tài khoản',
			buttonTitle: 'Quay lại cài đặt',
			buttonLink: `/${process.env.admin}/dashboard`,
			buttonSubmit: "+ Thêm mới",
			link2: `/${process.env.admin}/accounts/create`,
			accounts: accounts
		})
	} catch (error) {
		req.flash('error', "Trang bị lỗi")
		console.log(error)
		res.redirect('back');
	}
};

// [GET] /admin/accounts/create
module.exports.create = async (req, res) => {
	const roles = await Role.find({
		deleted: false
	});
	res.render("admin/pages/accounts/create.pug", {
		pageTitle: 'Tạo tài khoản',
		header: 'Tạo tài khoản',
		buttonTitle: 'Quay lại danh sách tài khoản',
		buttonLink: `/${process.env.admin}/accounts`,
		roles: roles
	})
};

// [POST] /admin/accounts/create
module.exports.createPost = async (req, res) => {
	const payload = {
		randomId: crypto.randomBytes(30).toString('hex')
	};

	const secretKey = process.env.secretKey;
	req.body.token = jwt.sign(payload, secretKey);
	req.body.password = md5(req.body.password)
	req.body.confirmPassword = md5(req.body.confirmPassword)

	const newAcoount = new Account(req.body);
	await newAcoount.save();
	req.flash('success', "Tạo tài khoản thành công!!!");
	res.redirect('back');
};

// [POST] /admin/accounts/edit/:id
module.exports.edit = async (req, res) => {
	const { id } = req.params;
	const account = await Account.findOne({
		_id: id,
		deleted: false
	}).lean()


	const roles = await Role.find({
		deleted: false
	});
	
	delete account.password;
	delete account.confirmPassword;
	delete account.token;
	
	console.log(id);
	res.render("admin/pages/accounts/edit.pug", {
		pageTitle: 'Chỉnh sửa tài khoản',
		header: 'Chỉnh sửa tài khoản',
		buttonTitle: 'Quay lại danh sách tài khoản',
		buttonLink: `/${process.env.admin}/accounts`,
		roles: roles,
		account: account,
		id: id
	})
}

// [PATCH] /admin/accounts/edit/:id
module.exports.editPatch = async (req, res) => {
	console.log(req.params);
	const { id } = req.params
	console.log(req.body);
	await Account.updateOne({
		_id: id
	}, req.body);


	res.redirect('back');
}