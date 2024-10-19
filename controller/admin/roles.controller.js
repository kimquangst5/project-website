const Role = require('../../models/role.model');
const Account = require('../../models/account.model');
require('dotenv').config();
const moment = require("moment")

module.exports.index = async (req, res) => {
	try {
		const roles = await Role.find({
			deleted: false
		})

		for (const item of roles) {
			const account = await Account.findOne({
				_id: item.createdBy
			})
			if (account) {
				item.createdBy = account.fullName
			}
			item.createdAtFormat = moment(item.createdAt).format('DD/MM-HH:mm')
		}
		res.render('admin/pages/roles/index.pug', {
			pageTitle: 'Trang phâns quyền',
			roles: roles,
		})
	} catch (error) {
		res.redirect('back');
	}

};

// [GET] /admin/roles
module.exports.create = async (req, res) => {
	try {
		res.render('admin/pages/roles/create.pug', {
			pageTitle: "Trang tạo mới nhóm quyền",
		})
	} catch (error) {
		res.redirect('back');
	}
};

// [PATCH] /admin/roles
module.exports.createPost = async (req, res) => {
	try {
		req.body.createdBy = res.locals.account.id
		const newRole = new Role(req.body);
		newRole.save();
		req.flash('success', 'Tạo mới nhóm quyền thành công')
		res.redirect(`back`);
	} catch (error) {
		res.redirect(`back`);
	}
};

// [POST] /admin/roles/edit/:id
module.exports.edit = async (req, res) => {
	try {
		const {
			id
		} = req.params;
		const role = await Role.findOne({
			_id: id,
			deleted: false
		})
		res.render('admin/pages/roles/edit.pug', {
			pageTitle: "Trang chỉnh sửa nhóm quyền",
			header: 'Chỉnh sửa nhóm quyền',
			roles: role,
		})
	} catch (error) {
		res.json({
			code: 400
		})
	}
};

// [PATCH] /admin/roles/edit/:id
module.exports.editPatch = async (req, res) => {
	if (res.locals.role.permisstion.includes(`roles_edit`)) {
		try {
			const {
				id
			} = req.params;
			await Role.updateOne({
				_id: id
			}, req.body);
			req.flash('success', "Cập nhật nhóm quyền thành công!!!");
			res.redirect('back');
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

};

// [PATCH] /admin/roles/delete/:id
module.exports.deletePatch = async (req, res) => {
	if (res.locals.role.permisstion.includes(`roles_deleted`)) {
		try {
			const {
				id
			} = req.params;
			await Role.updateOne({
				_id: id
			}, {
				deleted: true,
				deletedBy: res.locals.account.id
			})
			req.flash('success', "Xóa nhóm quyền thành công!!!");
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


// [GET] /admin/roles/permissions
module.exports.permissions = async (req, res) => {

	try {
		const records = await Role.find({
			deleted: false
		})

		res.render('admin/pages/roles/permissions.pug', {
			pageTitle: "Trang thiết lập phân quyền",
			records: records,
		})
	} catch (error) {
		res.redirect('back')
	}

};

// [PATCH] /admin/roles/permissions
module.exports.permissionsPatch = async (req, res) => {
	try {
		if (res.locals.role.permisstion.includes(`permissions_update`)) {
			const arr = req.body;
			arr.forEach(async (ele) => {
				const id = ele.id;
				const permission = ele.permission;
				await Role.updateOne({
					_id: id,
				}, {
					permisstion: permission
				})
			});

			req.flash('success', "Cập nhật thành công");
			res.json({
				code: 200,
				message: "Trần Kim Quang"
			})
		} else {
			res.json({
				code: 403
			})
		}

	} catch (error) {
		res.json({
			code: 400
		})
	}

}