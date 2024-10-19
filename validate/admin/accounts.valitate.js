// [POST] /admin/accounts/create
const Account = require("../../models/account.model")

module.exports.createPost = async (req, res, next) => {
	if (!req.body.useName) {
		await req.flash('error', 'Bạn chưa nhập tên đăng nhập!!!');
		res.redirect('back');
		return;
	}
	if (req.body.useName) {
		const usename = await Account.findOne({
			useName: req.body.useName
		})
		if (usename != null) {
			await req.flash('error', 'Tên đăng nhập đã được sử dụng!!!');
			res.redirect('back');
			return;
		}
		console.log(usename)
	}

	if (!req.body.password) {
		await req.flash('error', 'Bạn chưa nhập mật khẩu!!!');
		res.redirect('back');
		return;
	}

	if (!req.body.confirmPassword) {
		await req.flash('error', 'Bạn cần phải xác minh mật khẩu!!!');
		res.redirect('back');
		return;
	}



	if (req.body.password && req.body.confirmPassword) {
		if (req.body.password != req.body.confirmPassword) {
			await req.flash('error', 'Xác minh mật khẩu không trùng với mật khẩu');
			res.redirect('back');
			return;
		}
	}

	if (!req.body.email) {
		await req.flash('error', 'Bạn cần phải nhập Email!!!');
		res.redirect('back');
		return;
	}

	// if (req.body.email) {
	// 	if (!req.body.email.includes("@")) {
	// 		await req.flash('error', 'Bạn nhập sai email!!!');
	// 		res.redirect('back');
	// 		return;
	// 	} else {
	// 		if (!req.body.email.includes(".com") || !req.body.email.includes(".vn")) {
	// 			await req.flash('error', 'Bạn nhập sai email!!!');
	// 			res.redirect('back');
	// 			return;
	// 		}
	// 	}

	// }

	if (!req.body.fullName) {
		await req.flash('error', 'Bạn cần phải nhập H5 và tên!!!');
		res.redirect('back');
		return;
	}

	if (!req.body.phone) {
		await req.flash('error', 'Bạn cần phải nhập số điện thoại!!!');
		res.redirect('back');
		return;
	}

	if (req.body.phone) {
		const sdt = req.body.phone;
		if (sdt.length != 10) {
			await req.flash('error', 'Số điện thoại phải có 10 chữ số!!!');
			res.redirect('back');
			return;
		}
	}

	next();
};

module.exports.editPost = async (req, res, next) => {
	if (!req.body.useName) {
		await req.flash('error', 'Bạn chưa nhập tên đăng nhập!!!');
		res.redirect('back');
		return;
	}
	if (req.body.useName) {
		const usename = await Account.find({
			useName: req.body.useName
		})
		if (usename.length > 1) {
			await req.flash('error', 'Tên đăng nhập đã được sử dụng!!!');
			res.redirect('back');
			return;
		}
		console.log(usename)
	}


	if (!req.body.email) {
		await req.flash('error', 'Bạn cần phải nhập Email!!!');
		res.redirect('back');
		return;
	}

	if (!req.body.email.includes("@")) {
		await req.flash('error', 'Bạn nhập thiếu @!!!');
		res.redirect('back');
		return;
	}
	if (!(req.body.email.includes(".com"))) {
		await req.flash('error', 'Bạn nhập sai email!!!');
		res.redirect('back');
		return;
	} 



	if (!req.body.fullName) {
		await req.flash('error', 'Bạn cần phải nhập Họ và tên!!!');
		res.redirect('back');
		return;
	}

	if (!req.body.phone) {
		await req.flash('error', 'Bạn cần phải nhập số điện thoại!!!');
		res.redirect('back');
		return;
	}

	if (req.body.phone) {
		const sdt = req.body.phone;
		if (sdt.length != 10) {
			await req.flash('error', 'Số điện thoại phải có 10 chữ số!!!');
			res.redirect('back');
			return;
		}
	}

	next();
};