const Role = require("../../../models/role.model")
const Account = require("../../../models/account.model")
const moment = require('moment')

// [GET] /admin/trash/product-category
module.exports.index = async (req, res) => {
	try {
		const roles = await Role.find({
			deleted: true
		})

		for (const item of roles) {

			const account = await Account.findOne({
				_id: item.deletedBy
			})
			if (account) {
				item.deletedBy = account.fullName
			}
			item.updatedAtFormat = moment(item.updatedAt).format("DD/MM/YYYY - HH:mm:ss")
		}
		res.render('admin/pages/trash/role/index.pug', {
			pageTitle: 'Trang thùng rác nhóm quyền',
			header: 'Thùng rác nhóm quyền',
			roles: roles,
		})
	} catch (error) {
		res.redirect('back');
	}
};

// [PATCH] /admin/trash/role/:id
module.exports.restore = async (req, res) => {
	try {
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
	} catch (error) {
		res.json({
			code: 400
		})
	}

}

// [DELETE] /admin/trash/role/:id
module.exports.delete = async (req, res) => {
	if (res.locals.role.permisstion.includes(`trash_view_role`)) {
		try {
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