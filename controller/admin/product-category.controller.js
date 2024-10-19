require('dotenv').config();
const uploadCloudMiddlewares = require('../../middlewares/admin/uploadCloud.middlewares');
const ProductCategory = require('../../models/product-category.model')
const Account = require('../../models/account.model')
const createTreeUtil = require('../../utils/creeteTree.util');
const moment = require('moment');

// [GET] /admin/product-category/
module.exports.index = async (req, res) => {
	try {
		const records = await ProductCategory
			.find({
				deleted: false
			})
			.sort({
				position: 'desc'
			})

		for (const item of records) {
			if (item.createdBy) {
				const account = await Account.findOne({
					_id: item.createdBy
				})
				if (account) {
					item.createdBy = account.fullName

				}
			}
			item.createdAtFormat = moment(item.createdAt).format("DD/MM/YY-HH:mm")
		}
		res.render('admin/pages/product-category/index.pug', {
			pageTitle: 'Trang danh mục sản phẩm',
			records: records,
		})
	} catch (error) {
		res.redirect('back');
	}

};

// [GET] /admin/product-category/create
module.exports.create = async (req, res) => {
	try {
		const category = await ProductCategory.find({
			deleted: false,
			status: "active"
		});


		const newCategories = createTreeUtil(category);

		res.render('admin/pages/product-category/create.pug', {
			pageTitle: 'Trang thêm mới danh mục sản phẩm',
			category: newCategories
		})
	} catch (error) {
		res.redirect('back');
	}
}

// [POST] /admin/product-category/create
module.exports.createPost = async (req, res) => {
	if (res.locals.role.permisstion.includes("product-category_create")) {
		try {
			req.body.createdBy = res.locals.account.id
			if (req.body.position) {
				req.body.position = parseInt(req.body.position)
			} else {
				let total = await ProductCategory.countDocuments();
				req.body.position = parseInt(total) + 1;
			}

			const newProductCategory = new ProductCategory(req.body);
			await newProductCategory.save();

			req.flash('success', 'Tạo thành công!!!')
			res.redirect('back');
		} catch (error) {
			res.redirect(`/${process.env.admin}/product-category/create`);
		}
	} else {
		res.json({
			code: 403
		})
	}

}


// [PATCH] /admin/product-category/delete/:id
module.exports.deletePatch = async (req, res) => {
	if (res.locals.role.permisstion.includes("product-category_delete")) {
		try {
			const {
				id
			} = req.params;

			await ProductCategory.updateOne({
				_id: id
			}, {
				deleted: true,
				deletedBy: res.locals.account.id
			})

			req.flash('success', 'Xóa danh mục thành công!')
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

// [GET] /admin/product-category/edit/:id
module.exports.edit = async (req, res) => {
	try {
		const category = await ProductCategory.find({
			deleted: false
		});

		const newCategories = createTreeUtil(category);

		const {
			id
		} = req.params;
		const product = await ProductCategory.findOne({
			_id: id
		})

		res.render('admin/pages/product-category/edit.pug', {
			pageTitle: 'Trang chỉnh sửa danh mục',
			header: 'Chỉnh sửa danh mục',
			category: newCategories,
			product: product
		});
	} catch (error) {
		res.redirect('back');
	}

}

// [PATCH] /admin/product-category/editPatch/:id
module.exports.editPatch = async (req, res) => {
	if (res.locals.role.permisstion.includes("product-category_edit")) {
		try {
			const {
				id
			} = req.params;
			const check = await ProductCategory.findOne({
				_id: id
			});

			if (check) {
				req.body.updatedBy = res.locals.account.id
				if (req.body.position) {
					req.body.position = parseInt(req.body.position)
				} else {
					let total = await ProductCategory.countDocuments();
					req.body.position = parseInt(total) + 1;
				}
				const categoryNew = await ProductCategory.updateMany({
					_id: id,
					deleted: false
				}, req.body);
				req.flash('success', 'Cập nhật Danh mục thành công!');
				res.redirect(`back`)
			} else {
				res.redirect(`/${admin}/product-category`)
			}

		} catch (error) {
			res.redirect(`back`)
		}
	} else {
		res.json({
			code: 403
		})
	}


}

// [PATCH] /admin/product-category/change-status/:status/:id
module.exports.changeStatus = async (req, res) => {
	if (res.locals.role.permisstion.includes("product-category_edit")) {
		try {
			const {
				status,
				id
			} = req.params;
			await ProductCategory.updateOne({
				_id: id
			}, {
				status: status
			})
			req.flash("success", "Thay đổi trạng thái thành công!!!")
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

// [GET] /admin/product-category/detail/:id
module.exports.detail = async (req, res) => {
	if (res.locals.role.permisstion.includes("product-category_view")) {
		try {
			const category = await ProductCategory.find({
				deleted: false
			});

			const newCategories = createTreeUtil(category);
			const {
				id
			} = req.params
			const product_category = await ProductCategory.findOne({
				_id: id
			})

			const account = await Account.findOne({
				_id: product_category.createdBy
			})
			product_category.createdBy = account.fullName
			product_category.createdAtFormat = moment(product_category.createdAt).format("DD/MM/YYYY - HH:mm:ss")


			const accountUpdate = await Account.findOne({
				_id: product_category.updatedBy
			})
			if (accountUpdate) {
				product_category.updatedBy = accountUpdate.fullName
				product_category.updatedAtFormat = moment(product_category.updatedAt).format("DD/MM/YYYY - HH:mm:ss")
			}
			// else{
			// 	product_category.updatedBy = product_category.createdBy
			// 	product_category.updatedAtFormat = product_category.createdAtFormat
			// }

			res.render("admin/pages/product-category/detail.pug", {
				product_category: product_category,
				category: newCategories,
				pageTitle: "Kim Quang | Chi tiết danh mục sản phẩm"
			})

		} catch (error) {
			console.log(error)
		}
	} else {
		res.json({
			code: 403
		})
	}


}