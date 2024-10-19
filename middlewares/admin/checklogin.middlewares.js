require('dotenv').config();
const Account = require('../../models/account.model');
const Role = require('../../models//role.model');

module.exports = async (req, res, next) => {
	try {
		const admin = process.env.admin
		if (!req.cookies.token) {
			res.redirect(`/${admin}`);
			return;
		} else {
			try {
				const token = req.cookies.token;
				const accounts = await Account.findOne({
					token: token,
					deleted: false
				})
				const roles = await Role.find({
					deleted: false
				})
				if (accounts) {
					res.locals.account = accounts
					roles.forEach(it => {
						if (it.id == accounts.role_id) {
							res.locals.role = it
						}

					});
					let cnt = 0;
					roles.forEach(it => {
						cnt = Math.max(it.permisstion.length, cnt)
					});
					res.locals.permisstionMax = cnt
					next();
				} else {
					res.redirect(`/${admin}`);
					return;
				}
			} catch (error) {
				res.redirect(`/${admin}`);
				return;
			}

		}
	} catch (error) {
		res.redirect(`back`);
	}

};