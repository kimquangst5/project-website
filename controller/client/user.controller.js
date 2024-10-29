require('dotenv').config();

const User = require("../../models/user.model")
const ForgotPassword = require("../../models/forgot-password.model")
const Email = require("../../models/email.model")
const Phone = require("../../models/phone.model")
// Md5 mã hóa password
const md5 = require('md5');
const jwt = require('jsonwebtoken'); // tạo token
const crypto = require('crypto');
const {
	Script
} = require('vm');
const axios = require('axios');
const CLIENT_ID = process.env.CLIENT_ID
const CLIENT_SECRET = process.env.CLIENT_SECRET
const REDIRECT_URI = `https://kim-quang.vercel.app/member/register/gmail/auth/google/callback`;
const REDIRECT_URI_LOGIN = `member/login/gmail/auth/google/callback`;
const _ = require('lodash');
const moment = require("moment")
const userSocket = require('../../sockets/client/user.socket')
const {
	RecaptchaEnterpriseServiceClient
} = require('@google-cloud/recaptcha-enterprise');
const path = require('path'); // TinyMCE
const sendMail = require("../../utils/sendEmail.util")
const Storage = require('@google-cloud/storage');
module.exports.readFile = (req, res) => {
	console.log('Reading File');
	var archivo = Storage.bucket('project-backend-quangtk2005').file('request.json').createReadStream();
	console.log('Concat Data');
	var buf = '';
	archivo.on('data', function (d) {
		buf += d;
	}).on('end', function () {
		console.log(buf);
		console.log("End");
		res.send(buf);
	});

};

// [GET] /member/register
module.exports.register = async (req, res) => {

	res.render("client/pages/user/register.pug", {
		pageTitle: "Đăng ký tài khoản",
	})
};

// [POST] /member/register

module.exports.registerPost = async (req, res) => {
	try {
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
	} catch (error) {
		res.redirect('/')
	}

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
		const dataBody = {
			fullName: profile.name,
			email: profile.email
		}
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

const itemsRecapcha = {
	projectID: 'project-backend-quangtk2005',
	recaptchaKey: "6LdHk2kqAAAAAE89jQYnLGcsL5N86qiFvj1KBAy1",
	recaptchaAction: "submit",
}
async function createAssessment(token) {
	const client = new RecaptchaEnterpriseServiceClient();
	const projectPath = client.projectPath(itemsRecapcha.projectID);
	const request = ({
		assessment: {
			event: {
				token: token,
				siteKey: itemsRecapcha.recaptchaKey,
			},
		},
		parent: projectPath,
	});
	const [response] = await client.createAssessment(request);
	if (!response.tokenProperties.valid) {
		console.log(`The CreateAssessment call failed because the token was: ${response.tokenProperties.invalidReason}`);
		return null;
	}
	if (response.tokenProperties.action === itemsRecapcha.recaptchaAction) {
		console.log(`The reCAPTCHA score is: ${response.riskAnalysis.score}`);
		response.riskAnalysis.reasons.forEach((reason) => {
			console.log(reason);
		});
		return response.riskAnalysis.score;
	} else {
		console.log("The action attribute in your reCAPTCHA tag does not match the action you are expecting to score");
		return null;
	}
}


// [POST] /member/login
module.exports.loginPost = async (req, res) => {
	try {
		const token = req.body.recaptchaToken;
		try {
			const Recapcha_V3 = require("../../models/reCapcha.model")
			const recapcha = await Recapcha_V3.find({})

			// process.env.GOOGLE_APPLICATION_CREDENTIALS = recapcha[0]
			// console.log(process.env.GOOGLE_APPLICATION_CREDENTIALS)
			const score = await createAssessment(token);
			console.log(score)
			if (score && score > 0.5) {
				const user = await User.findOne({
					email: req.body.email,
				})
				if (!user) {
					req.flash("error", "Email không không tồn tại!");
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

				req.flash("success", `Đăng nhập thành công! - ${score}`);
				res.redirect('/');
			} else {
				res.status(400).send('Xác thực không thành công, nguy cơ rủi ro cao.');
			}
		} catch (error) {
			console.error('Lỗi xác thực reCAPTCHA:', error);
			res.status(500).send('Có lỗi xảy ra khi xác thực reCAPTCHA.');
		}


	} catch (error) {
		res.redirect('back')
	}
}

// [POST] member/login/gmail/auth/google
module.exports.loginGmail = (req, res, next) => {
	const URL_ORIGIN = req.body.URL_ORIGIN
	global.URL_ORIGIN = URL_ORIGIN
	const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${URL_ORIGIN}/${REDIRECT_URI_LOGIN}&response_type=code&scope=profile email`;
	// const newurll = new URL()
	res.json({
		code: 200,
		message: url
	})
	// res.redirect(url);
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
			redirect_uri: URL_ORIGIN + '/' + REDIRECT_URI_LOGIN,
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
		const dataBody = {
			fullName: profile.name,
			email: profile.email
		}
		const user = await User.findOne({
			email: dataBody.email,
		})
		if (!user) {
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
		} else {
			res.cookie('tokenUser', user.tokenUser, {
				expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)
			}) //số 2 là số ngày

		}
		req.flash("success", "Đăng nhập thành công!")
		res.redirect('/');

	} catch (error) {
		console.error('Error:', error);
		res.redirect('/member/login');
	}
}

// [POST] /member/log-out
module.exports.logOut = async (req, res) => {
	try {
		res.clearCookie('tokenUser');
		res.redirect("/")
	} catch (error) {
		res.redirect("/")
	}
}

// [GET] /forgot-password
module.exports.forgotPassword = async (req, res) => {
	res.render("client/pages/user/forgot-password.pug", {
		pageTitle: "Quên mật khẩu",
	})
}

// [POST] /forgot-password
module.exports.forgotPasswordPost = async (req, res) => {
	try {
		const {
			email
		} = req.body
		const user = await User.findOne({
			email: email
		})

		if (!user) {
			req.flash("error", "Vui lòng đăng ký tài khoản!!!");
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
		const emailDatabase = await Email.find({});


		const template = emailDatabase[0].content;
		const compiled = _.template(template);
		const result = compiled({
			MA_OTP: data.otp,
		});
		sendMail.sendMail(email,
			emailDatabase[0].title,
			result
		)
		res.redirect(`/member/otp?email=${user.email}`)
	} catch (error) {
		res.redirect("/")
	}
}

// [GET] /member/otp?email=...
module.exports.otp = async (req, res) => {
	try {
		const {
			email
		} = req.query;
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
	} catch (error) {
		res.redirect("/")
	}
}

// [POST] /member/otp?email=...
module.exports.otpPost = async (req, res) => {
	try {
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
	} catch (error) {
		res.redirect('/')
	}
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

// [GET] /member/dashboard
module.exports.dashboard = async (req, res) => {
	try {
		const user = await User.findOne({
			tokenUser: req.cookies.tokenUser
		})
		res.render("client/pages/user/dashboard.pug", {
			pageTitle: "Quản lí tài khoản",
			user: user
		})
	} catch (error) {
		res.redirect('/')
	}
}

// [GET] /member/profile
module.exports.profile = async (req, res) => {
	const user = await User.findOne({
		tokenUser: req.cookies.tokenUser
	})
	user.birthdayFormat = moment(user.birthday).format("YYYY-MM-DD")
	res.render("client/pages/user/profile.pug", {
		pageTitle: "Sửa thông tin",
		user: user
	})
}

// [PATCH] /member/profile
module.exports.profilePatch = async (req, res) => {
	await User.updateOne({
		tokenUser: req.cookies.tokenUser
	}, req.body);
	req.flash("success", "Cập nhật thông tin thành công!");
	res.redirect("back")
}

// [GET] /member/change-email
module.exports.changeEmail = async (req, res) => {
	const user = await User.findOne({
		tokenUser: req.cookies.tokenUser
	})
	res.render("client/pages/user/change email.pug", {
		pageTitle: "Thay đổi email",
		user: user
	})
}

// [POST] /member/change-email
module.exports.changeEmailPost = async (req, res) => {
	const {
		email
	} = req.body
	const user = await User.findOne({
		email: email
	})

	if (!user) {
		req.flash("error", "Vui lòng đăng ký tài khoản!!!");
		res.redirect("back");
		return;
	}

	if (email != user.email) {
		req.flash("error", "Nhập lại email!");
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
	const emailDatabase = await Email.find({});


	const template = emailDatabase[0].content;
	const compiled = _.template(template);
	const result = compiled({
		MA_OTP: data.otp,
	});
	sendMail.sendMail(email,
		emailDatabase[0].title,
		result
	)
	res.redirect(`/member/change-email/otp?email=${user.email}`)
}

// [GET] /member/change-email
module.exports.otpEmail = async (req, res) => {
	const {
		email
	} = req.query;
	const user = await User.findOne({
		email: email
	})

	if (!user) {
		req.flash("error", "Email không tồn tại!!!");
		res.redirect("back");
		return;
	}

	res.render("client/pages/user/otp email.pug", {
		pageTitle: "Nhập mã OTP",
		user: user
	})
}

// [POST] /member/change-email/otp
module.exports.otpEmailPost = async (req, res) => {
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
	res.redirect(`/member/change-email-success?email=${email}`)
}

// [GET] /member/change-email/success?email=...
module.exports.changeEmailSuccess = async (req, res) => {
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
	res.render("client/pages/user/change email success.pug", {
		pageTitle: "Thay đổi Email",
		email: user.email
	})
}
// [GET] /member/change-email/success?email=...
module.exports.changeEmailSuccessPost = async (req, res) => {
	if (!req.body.emailOld) {
		req.flash("error", "Email cũ không đúng!");
		res.redirect('back');
		return;
	}
	if (!req.body.email) {
		req.flash("error", "Email mới không đúng!");
		res.redirect('back');
		return;
	}
	if (req.body.emailOld == req.body.email) {
		req.flash("error", "2 email giống nhau!");
		res.redirect('back');
		return;
	}
	const user = await User.findOne({
		email: req.body.emailOld,
	})
	if (!user) {
		req.flash("error", "Email không tồn tại!");
		res.redirect("back");
		return;
	}

	const newEmail = await User.findOne({
		email: req.body.email,
	})
	if (newEmail) {
		req.flash("error", "Email đã tồn tại. Vui lòng  chọn email khác nhé!");
		res.redirect("back");
		return;
	}

	await User.updateOne({
		email: req.body.emailOld,
		deleted: false
	}, {
		email: req.body.email
	})

	req.flash("success", "Đổi email thành công!")
	res.redirect('/')
}







// [GET] /member/change-phone
module.exports.changePhone = async (req, res) => {
	const user = await User.findOne({
		tokenUser: req.cookies.tokenUser
	})
	res.render("client/pages/user/change phone.pug", {
		pageTitle: "Thay đổi số điện thoại",
		user: user
	})
}

// [POST] /member/change-phone
module.exports.changePhonePost = async (req, res) => {
	try {
		const {
			email
		} = req.body
		const user = await User.findOne({
			email: email
		})

		if (!user) {
			req.flash("error", "Vui lòng đăng ký tài khoản!!!");
			res.redirect("back");
			return;
		}

		if (email != user.email) {
			req.flash("error", "Nhập lại email!");
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
		const emailDatabase = await Email.find({});


		const template = emailDatabase[0].content;
		const compiled = _.template(template);
		const result = compiled({
			MA_OTP: data.otp,
		});
		sendMail.sendMail(email,
			emailDatabase[0].title,
			result
		)
		res.redirect(`/member/change-phone/otp?email=${user.email}`)
	} catch (error) {
		res.redirect('/')
	}
}

// [GET] /member/change-phone
module.exports.otpPhone = async (req, res) => {
	try {
		const {
			email
		} = req.query;
		const user = await User.findOne({
			email: email
		})

		if (!user) {
			req.flash("error", "Email không tồn tại!!!");
			res.redirect("back");
			return;
		}

		res.render("client/pages/user/otp phone.pug", {
			pageTitle: "Nhập mã OTP",
			user: user
		})
	} catch (error) {
		res.redirect('/')
	}
}

// [POST] /member/change-email/otp
module.exports.otpPhonePost = async (req, res) => {
	try {
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
		res.redirect(`/member/change-phone-success?email=${email}`)
	} catch (error) {
		res.redirect('/')
	}
}

// [GET] /member/change-email/success?email=...
module.exports.changePhoneSuccess = async (req, res) => {
	try {
		const {
			email
		} = req.query
		const user = await ForgotPassword.findOne({
			email: email,
		})
		const customer = await User.findOne({
			email: user.email
		})
		if (!user) {
			req.flash("error", "Email không tồn tại!");
			res.redirect("back");
			return;
		}
		if (!customer) {
			req.flash("error", "Email không tồn tại!");
			res.redirect("back");
			return;
		}
		const phone = customer.phone
		res.render("client/pages/user/change phone success.pug", {
			pageTitle: "Thay đổi số điện thoại",
			user: user[0],
			phoneUser: phone
		})
	} catch (error) {
		res.redirect('/')
	}

}

// [POST] /member/change-phone/success?phone=...
module.exports.changePhoneSuccessPost = async (req, res) => {
	try {
		if (req.body.phoneOld != 'Chưa có') {
			const kt = await User.findOne({
				phone: req.body.phoneOld
			})
			if (!kt) {
				req.flash("error", ("Số này không tồn tại!"));
				res.redirect('back');
				return;
			}


		}
		const check = await User.findOne({
			phone: req.body.phone
		})
		if (check) {
			req.flash("error", ("Số này đã có người khác sử dụng!"));
			res.redirect('back');
			return;
		}

		if (req.body.phone.length != 10) {
			req.flash("error", ("Phải có 10 chữ số"));
			res.redirect('back');
			return;
		}
		if (req.body.phone[0] != '0') {
			req.flash("error", ("Không đúng định dạng số điện thoại"));
			res.redirect('back');
			return;
		}
		const listPhone = await Phone.find({});
		const arrayListPhone = listPhone[0].listPhone
		const sdt = req.body.phone[0] + req.body.phone[1] + req.body.phone[2];
		if (!arrayListPhone.includes(sdt)) {
			req.flash("error", ("Không đúng định dạng số điện thoại"));
			res.redirect('back');
			return;
		}

		await User.updateOne({
			tokenUser: req.cookies.tokenUser,
			deleted: false
		}, {
			phone: req.body.phone
		})

		req.flash("success", "Đổi số điện thoại thành công!")
		res.redirect('/member/profile')
	} catch (error) {
		res.redirect('/')
	}
}

// [GET] /member/reset-password
module.exports.resetPassword = async (req, res) => {
	res.render("client/pages/user/reset password.pug", {
		pageTitle: "Đổi mật khẩu"
	})
}

// [PATCH] /member/reset-password
module.exports.resetPasswordPatch = async (req, res) => {
	const old = req.body.passwordOld
	const pass = req.body.passwordNew
	const again = req.body.confirmPassword
	if (!req.body.passwordOld || !req.body.passwordNew || !req.body.confirmPassword) {
		req.flash("error", "Dữ liệu trống");
		res.redirect("back");
		return;
	}

	if (pass != again) {
		req.flash("error", "Xác nhận mật khẩu không giống!");
		res.redirect("back");
		return;
	}
	const passold = await User.findOne({
		tokenUser: req.cookies.tokenUser
	})
	if (!passold) {
		req.flash("error", "Vui lòng đăng nhập!");
		res.redirect("back");
		return;
	}

	if (md5(old) != passold.password) {
		req.flash("error", "Mật khẩu cũ không đúng!");
		res.redirect("back");
		return;
	}


	await User.updateOne({
		tokenUser: req.cookies.tokenUser
	}, {
		password: md5(pass)
	})
	req.flash("success", "Đổi mật khẩu thành công!");
	res.redirect("/");
}

// $ne: not equal
// $nin: not equal
// $and
// [GET] /member/not-friend
module.exports.notFriend = async (req, res) => {
	userSocket(req, res);

	const requestFriends = res.locals.infoUser.requestFriends
	const acceptFriends = res.locals.infoUser.acceptFriends
	const friendsList = res.locals.infoUser.friendsList;


	const friendsListId = friendsList.map(it => it.userId)
	const users = await User.find({

		$and: [{
				_id: {
					$ne: res.locals.infoUser
				}
			},
			{
				_id: {
					$nin: requestFriends
				}
			},
			{
				_id: {
					$nin: acceptFriends
				}
			},
			{
				_id: {
					$nin: friendsListId
				}
			}

		],
		deleted: false,
		status: 'active'
	})


	res.render("client/pages/user/friend/not friend.pug", {
		pageTitle: "Danh sách người dùng",
		users: users,
		requestFriends: requestFriends,
		acceptFriends: acceptFriends
	})
}

// $ne: not equal
// $nin: not equal
// $and
// [GET] /member/request
module.exports.request = async (req, res) => {
	userSocket(req, res);

	const requestFriends = res.locals.infoUser.requestFriends
	const acceptFriends = res.locals.infoUser.acceptFriends
	const users = await User.find({
		_id: {
			$in: requestFriends
		},
		deleted: false,
		status: 'active'
	})


	res.render("client/pages/user/friend/request.pug", {
		pageTitle: "Lời mời đã gửi",
		users
	})
}


// $ne: not equal
// $nin: not equal
// $and
// [GET] /member/accept
module.exports.accept = async (req, res) => {
	userSocket(req, res);
	// const requestFriends = res.locals.infoUser.requestFriends
	const acceptFriends = res.locals.infoUser.acceptFriends
	const users = await User.find({
		_id: {
			$in: acceptFriends
		},
		deleted: false,
		status: 'active'

	})


	res.render("client/pages/user/friend/accept.pug", {
		pageTitle: "Lời mời đã nhận",
		users: users
	})
}


// $ne: not equal
// $nin: not equal
// $and
// [GET] /member/request
module.exports.friend = async (req, res) => {
	userSocket(req, res);

	const requestFriends = res.locals.infoUser.requestFriends
	const acceptFriends = res.locals.infoUser.acceptFriends
	const friendsList = res.locals.infoUser.friendsList
	const friendsListId = friendsList.map(it => it.userId)

	const users = await User.find({
		_id: {
			$in: friendsListId
		}
	}).select('-tokenUser -password -birthday')

	users.forEach(user => {
		const friend = friendsList.find(friend => friend.userId == user.id)
		user.roomChatId = friend.roomChatId
	})
	// forof


	res.render("client/pages/user/friend/friend.pug", {
		pageTitle: "Danh sách bạn bè",
		users: users
	})
}