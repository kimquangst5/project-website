const Role = require('../../models/role.model');
require('dotenv').config();

module.exports.index = async (req, res) => {
	const roles = await Role.find({
		deleted: false
	})
	res.render('admin/pages/roles/index.pug', {
		pageTitle: 'Trang phâns quyền',
		header: 'Nhóm quyền',
		roles: roles,
		buttonTitle: "+ Thêm mới nhóm quyền",
		buttonLink: `/${process.env.admin}/roles/create`
	})
};

module.exports.create = async (req, res) => {
	res.render('admin/pages/roles/create.pug', {
		pageTitle: "Trang tạo mới nhóm quyền",
		header: 'Tạo mới nhóm quyền',
		buttonTitle: "Quay lại danh sách",
		buttonLink: `/${process.env.admin}/roles`
	})
};

module.exports.createPost = async (req, res) => {
	console.log(req.body);

	const newRole = new Role(req.body);
	newRole.save();
	req.flash('success', 'Tạo mới nhóm quyền thành công')
	res.redirect(`back`);
};

// [POST] /admin/roles/edit/:id
module.exports.edit = async (req, res) => {
	if (res.locals.role.permisstion.includes(`roles_edit`)) {
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
				role: role,
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


};

// [PATCH] /admin/roles/edit/:id
module.exports.editPatch = async (req, res) => {
	if (res.locals.role.permisstion.includes(`roles_edit`)) {
		try {
			const {
				id
			} = req.params;
			console.log(req.body)
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
	const {
		id
	} = req.params;
	await Role.updateOne({
		_id: id
	}, {
		deleted: true
	})
	req.flash('success', "Xóa nhóm quyền thành công!!!");
	res.json({
		code: 200
	})
}


// [GET] /admin/roles/permissions
module.exports.permissions = async (req, res) => {

	const records = await Role.find({
		deleted: false
	})

	res.render('admin/pages/roles/permissions.pug', {
		pageTitle: "Trang thiết lập phân quyền",
		header: 'Thiết lập phân quyền',
		records: records,
	})

};

// [PATCH] /admin/roles/permissions
module.exports.permissionsPatch = async (req, res) => {
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

	req.flash('success', "Cập nhật quyền thành công");
	res.json({
		code: 200,
		message: "Trần Kim Quang"
	})
}