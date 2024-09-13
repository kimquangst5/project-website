const Account = require('../../models/account.model')
const Role = require('../../models/role.model')
const moment = require("moment")


// Md5 mã hóa password
const md5 = require('md5');
const jwt = require('jsonwebtoken'); // tạo token
const crypto = require('crypto');
const {
	Script
} = require('vm');

require('dotenv').config();

// [GET] /admin/accounts
module.exports.index = async (req, res) => {
	try {
		const accounts = await Account.find({
			deleted: false
		})
		const roles = await Role.find({
			deleted: false
		})
		accounts.forEach(it => {
			roles.forEach(item => {
				if (it.role_id == item.id) {
					it.roleTitle = item.title
				}
			});
		});

		for (const it of accounts) {
			const nick = await Account.findOne({
				_id: it.createdBy
			})
			if(nick){
				it.createdBy = nick.fullName
			}
			it.createdAtFormat = moment(it.createdAt).format("DD/MM-HH:mm")
		}
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
	if (res.locals.role.permisstion.includes("account_create")){
		try {
			req.body.createdBy = res.locals.account.id
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
		} catch (error) {
			res.redirect('back');
		}
	}
	else{
		res.redirect('https://thuvienphapluat.vn/van-ban/Cong-nghe-thong-tin/Luat-an-ninh-mang-2018-351416.aspx')
	}
};

// [POST] /admin/accounts/edit/:id
module.exports.edit = async (req, res) => {
	const {
		id
	} = req.params;
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
	if (res.locals.role.permisstion.includes("account_edit")){
		const {
			id
		} = req.params
		console.log(req.body);
		await Account.updateOne({
			_id: id
		}, req.body);
	
		req.flash('success', 'Cập nhật thành công!!!')
		res.redirect('back');
	}
	else{
		res.redirect('https://thuvienphapluat.vn/van-ban/Cong-nghe-thong-tin/Luat-an-ninh-mang-2018-351416.aspx')
	}
	
}

// [PATCH] /admin/accounts/delete/:id
module.exports.delete = async (req, res) => {
	

	if (res.locals.role.permisstion.includes("account_delete")) {
		try {
			const {
				id
			} = req.params
			await Account.updateOne({
				_id: id
			}, {
				deleted: true,
				deletedBy: res.locals.account.id
			});
		
		
			req.flash('success', "Xóa thành công!!!");
		
			res.json({
				code: 200
			})
			
		} catch (error) {
			res.json({
				code: 400
			})
		}
	} else {
		res.json({
			code: 403
		})
	}

	
}

// [PATCH] /admin/accounts/change-status/:status/:id
module.exports.changeStatus = async (req, res) => {
	if (res.locals.role.permisstion.includes("account_edit")) {
		try {
			const {
				status,
				id
			} = req.params

			await Account.updateOne({
				_id: id
			}, {
				status: status
			});


			req.flash('success', "Thay đổi trạng thái thành công!!!");

			res.json({
				code: 200
			})
			
		} catch (error) {
			res.json({
				code: 400
			})
		}
	} else {
		res.json({
			code: 403
		})
	}

}

// [GET] /admin/accounts/change-password/:id
module.exports.changePassword = async (req, res) => {
	res.render("admin/pages/accounts/change-password.pug", {
		pageTitle: "Đổi mật khẩu"
	})
}

// [PATCH] /admin/accounts/change-password/:id
module.exports.changePasswordPatch = async (req, res) => {
	if (res.locals.role.permisstion.includes("account_edit")) {
		req.body.new_password = md5(req.body.new_password)
		req.body.confirm_new_password = md5(req.body.confirm_new_password)
		const { id } = req.params
		await Account.updateOne({
			_id: id
		}, {
			password: req.body.new_password,
			confirmPassword: req.body.confirm_new_password

		})

		req.flash('success', 'Đổi mật khẩu thành công!!!')
		res.redirect('back')
	}
	else{
		res.redirect('https://thuvienphapluat.vn/van-ban/Cong-nghe-thong-tin/Luat-an-ninh-mang-2018-351416.aspx')
	}
	
}