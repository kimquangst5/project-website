// [POST] /admin/accounts/create
const Account = require("../../models/account.model")
const md5 = require('md5');
module.exports.createPost = async (req, res, next) => {

	if (!req.body.old_password) {
		await req.flash('error', 'Bạn chưa nhập mật khẩu cũ!!!');
		res.redirect('back');
		return;
	}

	if (!req.body.new_password) {
		await req.flash('error', 'Bạn chưa nhập mật khẩu mới!!!');
		res.redirect('back');
		return;
	}

	if (!req.body.confirm_new_password) {
		await req.flash('error', 'Bạn chưa xác nhận mật khẩu!!!');
		res.redirect('back');
		return;
	}

	const passwordDatabase = md5(req.body.old_password)
	const {
		id
	} = req.params
	const account = await Account.findOne({
		_id: id
	})
	if (account == null) {
		await req.flash('error', 'Tài khoản không tồn tại');
		res.redirect('back');
		return;
	} else {
		if (account.password != passwordDatabase) {
			await req.flash('error', 'Mật khẩu cũ không giống với mật khẩu trước đây bạn nhập');
			res.redirect('back');
			return;
		} else {
			if (req.body.old_password && req.body.new_password && req.body.confirm_new_password) {
				if (req.body.old_password == req.body.new_password) {
					await req.flash('error', 'Mật khẩu cũ và mới giống nhau!!!');
					res.redirect('back');
					return;
				}

				if (req.body.new_password != req.body.confirm_new_password) {
					await req.flash('error', 'Mật khẩu mới và xác nhận mật khẩu không giống nhau!!!');
					res.redirect('back');
					return;
				}
			}
		}
	}

	next();
};