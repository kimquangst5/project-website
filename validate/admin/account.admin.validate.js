// [POST] /admin/accounts/create
const Account = require("../../models/account.model")
const Role = require("../../models/role.model")
const md5 = require('md5');
module.exports.changeAdmin = async (req, res, next) => {
	if (req.params.id) {
		const id = req.params.id
		const account = await Account.findOne({
			_id: id
		})
		if (account != null) {

			const role = await Role.findOne({
				_id: account.role_id
			})
			if (role != null) {
				const roles = await Role.find({
					deleted: false
				})
				let cnt = 0;
				roles.forEach(it => {
					if (it.permisstion.length > cnt) {
						cnt = it.permisstion.length
						console.log(cnt)
					}

				})
				if (role.permisstion.length == cnt) {
					await req.flash('error', 'Không thể hành động với tài khoản này!!!');
					res.json({
						code: 400
					})
					return;
				}
			}
		}
	}

	next();
};