const Role = require("../../../models/role.model")
const Account = require("../../../models/account.model")
const moment = require("moment")

// [GET] /admin/trash/accounts
module.exports.index = async (req, res) => {
	const account = await Account.find({
		deleted: true
	})

	for (const it of account) {
		
		const account = await Account.findOne({
			_id: it.deletedBy
		})
		if(account){
			it.deletedBy = account.fullName
		}
		it.updatedAtFormat = moment(it.updatedAt).format("DD/MM/YYYY - HH:MM:SS")
	}
	res.render('admin/pages/trash/accounts/index.pug', {
		pageTitle: 'Trang thùng rác tài khoản',
		header: 'Thùng rác tài khoản quản trị',
		accounts: account,
	})
};

// [PATCH] /admin/trash/accounts/:id
module.exports.restore = async (req, res) => {

	const {
		id
	} = req.params;

	await Account.updateOne({
		_id: id
	}, {
		deleted: false
	})

	req.flash('success', 'Khôi phục thành công!')

	res.json({
		code: 200
	})
}

// [DELETE] /admin/trash/accounts/:id
module.exports.delete = async (req, res) => {
	if (res.locals.role.permisstion.includes(`trash_views_account`)) {
		const {
			id
		} = req.params;

		await Account.deleteOne({
			_id: id
		})

		req.flash('success', 'Xóa tài khoản thành công!')

		res.json({
			code: 200
		})
	}
	else{

		res.json({
			code: 403
		})
	}


}