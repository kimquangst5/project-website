const axios = require('axios');
const CLIENT_ID = '305581713618-k13nhu7troqk6gdkvuo237tnpbjtn6ha.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URI = 'http://localhost:3000/member/register/gmail/auth/google/callback';

// [GET] /auth/google
module.exports.registerGmail = (req, res) => {
	const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=profile email`;
	res.redirect(url);
}

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
		console.log(profile)
		// console.log(profile.name)
		// console.log(profile.picture)
		// console.log(profile.id)
		req.flash("success", "Đăng ký tài khoản thành công!")
		res.redirect('/');
	} catch (error) {
		console.error('Error:', error);
		res.redirect('/member/login');
	}
}