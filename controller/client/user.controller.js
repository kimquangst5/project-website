const User = require("../../models/user.model")
const ForgotPassword = require("../../models/forgot-password.model")
// Md5 mã hóa password
const md5 = require('md5');
const jwt = require('jsonwebtoken'); // tạo token
const crypto = require('crypto');
const {
	Script
} = require('vm');
const axios = require('axios');
const CLIENT_ID = '305581713618-k13nhu7troqk6gdkvuo237tnpbjtn6ha.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URI = 'https://tkq.vercel.app/member/register/gmail/auth/google/callback';
const REDIRECT_URI_LOGIN = 'https://tkq.vercel.app/member/login/gmail/auth/google/callback';

const sendMail = require("../../utils/sendEmail.util")

// [GET] /member/register
module.exports.register = async (req, res) => {

	res.render("client/pages/user/register.pug", {
		pageTitle: "Đăng ký tài khoản",
	})
};

// [POST] /member/register
module.exports.registerPost = async (req, res) => {
	const email = req.body.email
	const user = await User.findOne({
		email: email,
	})

	if (user) {
		req.flash("error", "Email đã tồn tại!");
		res.redirect('back');
		return;
	}

	if (req.body.password) {
		req.body.password = md5(req.body.password);
	}

	const payload = {
		randomId: crypto.randomBytes(30).toString('hex')
	};
	const secretKey = process.env.secretKey;
	req.body.tokenUser = jwt.sign(payload, secretKey);
	res.cookie('tokenUser', req.body.tokenUser, {
		expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)
	}) //số 1 là số ngày
	const newUser = new User(req.body);
	await newUser.save();
	req.flash('success', "Tạo tài khoản thành công!!!");
	res.redirect('/');
}

// [GET] member/register/gmail/auth/google
module.exports.registerGmail = (req, res, next) => {
	const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=profile email`;
	res.redirect(url);
}
// [GET] member/register/gmail/auth/google/callback
module.exports.registerGmailCallback = async (req, res) => {
	const {
		code
	} = req.query;

	try {
		// Trao đổi mã ủy quyền để lấy mã token
		const {
			data
		} = await axios.post('https://oauth2.googleapis.com/token', {
			client_id: CLIENT_ID,
			client_secret: CLIENT_SECRET,
			code,
			redirect_uri: REDIRECT_URI,
			grant_type: 'authorization_code',
		});

		const {
			access_token,
			id_token
		} = data;

		// Use access_token or id_token to fetch user profile
		const {
			data: profile
		} = await axios.get('https://www.googleapis.com/oauth2/v1/userinfo', {
			headers: {
				Authorization: `Bearer ${access_token}`
			},
		});
		// Code to handle user authentication and retrieval using the profile data
		// console.log(profile.name)
		const dataBody = {
			fullName: profile.name,
			email: profile.email
		}
		console.log(dataBody)
		const user = await User.findOne({
			email: dataBody.email,
		})
	
		if (user) {
			req.flash("error", "Email đã tồn tại!");
			res.redirect('/member/login');
			return;
		}

		const payload = {
			randomId: crypto.randomBytes(30).toString('hex')
		};
		const secretKey = process.env.secretKey;
		const tokenUser = jwt.sign(payload, secretKey);
		dataBody.tokenUser = tokenUser
		res.cookie('tokenUser', tokenUser, {
			expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)
		}) //số 1 là số ngày
		const newUser = new User(dataBody);
		await newUser.save();

		req.flash("success", "Đăng ký tài khoản thành công!")
		    res.redirect('/');
	} catch (error) {
		console.error('Error:', error);
		res.redirect('/member/login');
	}
}

// [GET] /member/login
module.exports.login = async (req, res) => {
	res.render("client/pages/user/login.pug", {
		pageTitle: "Đăng nhập",
	})
}

// [POST] /member/login
module.exports.loginPost = async (req, res) => {
	const user = await User.findOne({
		email: req.body.email,
	})
	if (!user) {
		req.flash("error", "Email không tồn tại!");
		res.redirect('back');
		return;
	}

	req.body.password = md5(req.body.password);
	if (req.body.password != user.password) {
		req.flash("error", "Mật khẩu không đúng!");
		res.redirect('back');
		return;
	}

	res.cookie('tokenUser', user.tokenUser, {
		expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)
	}) //số 2 là số ngày

	req.flash("success", "Đăng nhập thành công!");
	res.redirect('/');
}

// [GET] member/login/gmail/auth/google
module.exports.loginGmail = (req, res, next) => {
	const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI_LOGIN}&response_type=code&scope=profile email`;
	res.redirect(url);
}
// [GET] member/login/gmail/auth/google/callback
module.exports.loginGmailCallback = async (req, res) => {
	const {
		code
	} = req.query;

	try {
		// Trao đổi mã ủy quyền để lấy mã token
		const {
			data
		} = await axios.post('https://oauth2.googleapis.com/token', {
			client_id: CLIENT_ID,
			client_secret: CLIENT_SECRET,
			code,
			redirect_uri: REDIRECT_URI_LOGIN,
			grant_type: 'authorization_code',
		});

		const {
			access_token,
			id_token
		} = data;

		// Use access_token or id_token to fetch user profile
		const {
			data: profile
		} = await axios.get('https://www.googleapis.com/oauth2/v1/userinfo', {
			headers: {
				Authorization: `Bearer ${access_token}`
			},
		});
		// Code to handle user authentication and retrieval using the profile data
		// console.log(profile.name)
		const dataBody = {
			fullName: profile.name,
			email: profile.email
		}
		console.log(dataBody)
		const user = await User.findOne({
			email: dataBody.email,
		})
		if (!user) {
			req.flash("error", "Email không tồn tại!");
			res.redirect('back');
			return;
		}

		res.cookie('tokenUser', user.tokenUser, {
			expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)
		}) //số 2 là số ngày

		req.flash("success", "Đăng nhập tài khoản thành công!")
		res.redirect('/');
	} catch (error) {
		console.error('Error:', error);
		res.redirect('/member/login');
	}
}


module.exports.logOut = async (req, res) => {
	res.clearCookie('tokenUser');
	res.redirect("/")
}


module.exports.forgotPassword = async (req, res) => {
	res.render("client/pages/user/forgot-password.pug", {
		pageTitle: "Quên mật khẩu",
	})
}

// [POST] /forgot-password
module.exports.forgotPasswordPost = async (req, res) => {
	const {
		email
	} = req.body
	const user = await User.findOne({
		email: email
	})

	if (!user) {
		req.flash("error", "Email không tồn tại!!!");
		res.redirect("back");
		return;
	}

	const randow = {
		otp: crypto.randomInt(100000, 999999)
	}

	const data = {
		email: email,
		otp: randow.otp,
		expireAt: Date.now() + 3 * 60 * 1000
	}

	const newForgotPassword = new ForgotPassword(data);
	await newForgotPassword.save();
	sendMail.sendMail(email,
		"Xác thực mã OTP",
		`<br><div><strong style="font-size: 20px;">Xin chào ${user.fullName}</strong></div><br><span>Mã OTP của bạn là: </div><strong style="color: #E92031; font-size: 30px;">${data.otp}</strong><br><br><div>Mã này có hiệu lức trong vòng 3 phút.</div><div>Vui lòng không cung cấp mã này cho bất cứ ai!</div>`
	)
	res.redirect(`/member/otp?email=${user.email}`)
}

// [GET] /member/otp?email=...
module.exports.otp = async (req, res) => {
	const {
		email
	} = req.query;
	console.log(email)
	const user = await User.findOne({
		email: email
	})

	if (!user) {
		req.flash("error", "Email không tồn tại!!!");
		res.redirect("back");
		return;
	}

	res.render("client/pages/user/otp.pug", {
		pageTitle: "Nhập mã OTP",
		user: user
	})
}

// [POST] /member/otp?email=...
module.exports.otpPost = async (req, res) => {
	const {
		email,
		otp
	} = req.body
	const otpForgot = await ForgotPassword.findOne({
		email: email,
		otp: otp
	})
	if (!otpForgot) {
		req.flash("error", "Mã OTP không đúng!");
		res.redirect("back");
		return;
	}
	res.redirect(`/member/change-password?email=${email}`)
}

module.exports.changePassword = async (req, res) => {
	const {
		email
	} = req.query
	const user = await ForgotPassword.findOne({
		email: email,
	})
	if (!user) {
		req.flash("error", "Email không tồn tại!");
		res.redirect("back");
		return;
	}
	res.render("client/pages/user/change-password.pug", {
		pageTitle: "Thay đổi mật khẩu",
		email: email
	})
}

module.exports.changePasswordPost = async (req, res) => {
	console.log(req.body)
	const {
		email,
		password,
		confirmPassword
	} = req.body
	const user = await User.findOne({
		email: email,
	})
	if (!user) {
		req.flash("error", "Email không tồn tại!");
		res.redirect("back");
		return;
	}

	if (password != confirmPassword) {
		req.flash("error", "Xác nhận mật khẩu không giống!");
		res.redirect("back");
		return;
	}
	req.body.password = md5(req.body.password)
	req.body.confirmPassword = md5(req.body.confirmPassword)

	await User.updateOne({
		email: email,
		deleted: false
	}, {
		password: req.body.password,
		confirmPassword: req.body.confirmPassword
	})

	res.cookie('tokenUser', user.tokenUser, {
		expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)
	}) //số 2 là số ngày
	req.flash("success", "Đổi mật khẩu thành công!")
	res.redirect('/')

}