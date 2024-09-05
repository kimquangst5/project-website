const Role = require("../../../models/role.model")
const Account = require("../../../models/account.model")

// [GET] /admin/trash/product-category
module.exports.index = async (req, res) => {
	const roles = await Role.find({
		deleted: true
	})
	res.render('admin/pages/trash/role/index.pug', {
		pageTitle: 'Trang thùng rác nhóm quyền',
		header: 'Thùng rác nhóm quyền',
		roles: roles,
	})
};

// [PATCH] /admin/trash/role/:id
module.exports.restore = async (req, res) => {

	const {
		id
	} = req.params;

	await Role.updateOne({
		_id: id
	}, {
		deleted: false
	})

	req.flash('success', 'Khôi phục thành công!')

	res.json({
		code: 200
	})
}

// [DELETE] /admin/trash/role/:id
module.exports.delete = async (req, res) => {
	if (res.locals.role.permisstion.includes(`trash_view_role`)) {
		const {
			id
		} = req.params;

		const roleId = await Account.findOne({
			role_id: id
		}).select('role_id')
		if (roleId != null) {
			await Account.updateOne({
				role_id: id
			}, {
				role_id: ''
			})
		}
		await Role.deleteOne({
			_id: id
		})

		req.flash('success', 'Xóa thành công!')

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