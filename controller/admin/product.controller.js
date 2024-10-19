const Product = require('../../models/product.model');
require('dotenv').config();
const ProductCategory = require('../../models/product-category.model')
const createTreeUtil = require('../../utils/creeteTree.util');
const Account = require('../../models/account.model');
const DisplayProduct = require('../../models/display-product.model');
const moment = require('moment');
const system = require(`../../config/system`)
const priceNew = require("../../utils/price-new.util")

// [GET] /admin/product/
module.exports.index = async (req, res) => {
	try {
		let find = {
			deleted: false
		}

		// Fillter Status
		if (req.query.status) {
			find.status = req.query.status
		}
		// End Fillter Status

		// Search
		let key = ''
		if (req.query.key) {
			const regex = new RegExp(req.query.key, 'i') //regex expression
			find.title = regex
			key = req.query.key
		}
		// End  Search

		// Pagination
		const displayProduct = await DisplayProduct.find({});
		// console.log(displayProduct[0].limit)
		let pagination = {
			current: 1,
			limit: parseInt(displayProduct[0].limit)
		};

		pagination.totalProduct = await Product.countDocuments(find)
		if (req.query.page) {
			pagination.current = parseInt(req.query.page)
		}

		if (pagination.totalProduct > 0) {
			pagination.skip = (pagination.limit * (pagination.current - 1))
			pagination.totalPage = Math.ceil(pagination.totalProduct / pagination.limit)
		}
		// End Pagination

		// Fillter Status
		const fillerStatus = [{
				lable: '',
				value: 'Tất cả'
			},
			{
				lable: 'active',
				value: 'Hoạt động'
			},
			{
				lable: 'inactive',
				value: 'Dừng hoạt động'
			}
		];
		// Hết Fillter Status

		// Status
		const statusOption = [{
				lable: 'Chọn hành động...',
				value: ''
			},
			{
				lable: 'Hoạt động',
				value: 'active'
			},
			{
				lable: 'Dừng hoạt động',
				value: 'inactive'
			},
			{
				lable: 'Xóa các sản phẩm đã chọn',
				value: 'deleted-product'
			}
		];

		let sort = {

		};

		if (req.query.sortKey && req.query.sortValue) {
			sort[req.query.sortKey] = req.query.sortValue
		} else {
			sort.position = 'desc'
		}

		const product = await Product
			.find(find)
			.limit(pagination.limit)
			.skip(pagination.skip)
			.sort(sort)

		priceNew(product)


		for (const it of product) {
			const account = await Account.findOne({
				_id: it.createdBy
			})
			if (account) {
				it.createdBy = account.fullName
			}
			it.createdAtFormat = moment(it.createdAt).format('DD/MM HH:mm');
		}
		console.log(pagination)
		res.render('admin/pages/product/index.pug', {
			pageTitle: 'Trang quản lí sản phẩm',
			product: product,
			key: key,
			pagination: pagination,
			fillerStatus: fillerStatus,
			statusOption: statusOption,
			displayProduct: displayProduct[0].limit
		})
	} catch (error) {
		res.redirect('back');
	}
};

// [PATCH] /admin/product/change-status/:status/:id
module.exports.changeStatus = async (req, res) => {


	try {
		if (res.locals.role.permisstion.includes("products_edit")) {
			const {
				status,
				id
			} = req.params;


			await Product.updateOne({
				_id: id
			}, {
				status: status
			});
			req.flash('update', 'Cập nhật trạng thái thành công!');

			res.json({
				code: 200
			})
		} else {
			res.json({
				code: 403
			})
		}

	} catch (error) {
		req.flash('error', "Bạn cố tình nhập sai Id sản phẩm!!!")
		res.json({
			code: 400
		})
	}


}

// [PATCH] /admin/product/change-multi
module.exports.changeMulti = async (req, res) => {
	try {
		if (res.locals.role.permisstion.includes("products_edit")) {
			const {
				status,
				ids
			} = req.body;

			if (status == 'deleted-product') {
				await Product.updateMany({
					_id: ids
				}, {
					deleted: true
				});
				req.flash('success', `Xóa các sản phẩm thành công!`);
				res.json({
					code: 200
				})
			} else {
				await Product.updateMany({
					_id: ids
				}, {
					status: status
				});

				res.json({
					code: 200
				})
			}

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

// [PATCH] /admin/product/delete/:id
module.exports.delete = async (req, res) => {
	if (res.locals.role.permisstion.includes("products_delete")) {
		try {
			const id = req.params.id;
			await Product.updateOne({
				_id: id
			}, {
				deleted: true,
				deletedBy: res.locals.account.id
			})

			req.flash('success', 'Xóa sản phẩm thành công!');

			res.json({
				code: 200,
				message: system.admin
			})
		} catch (error) {
			req.flash('error', 'Xóa sản phẩm thất bại!!!');
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

// [PATCH] /admin/product/change-multi-restore
module.exports.changeMultiRestore = async (req, res) => {
	try {
		// const status = req.body.status;
		// const ids = req.body.ids;

		// if (status == 'restore') {
		// 	await Product.updateMany({
		// 		_id: ids
		// 	}, {
		// 		deleted: false
		// 	})
		// 	req.flash('success', 'Khôi phục sản phẩm thành công!')
		// }

		// if (status == 'permanentlyDelete') {

		// 	await Product.deleteMany({
		// 		_id: ids
		// 	})
		// 	await uploadCloudMiddlewares.deleteMulti(req.body.nameImages)
		// 	req.flash('success', 'Xóa vĩnh viễn sản phẩm thành công!')
		// }


		// res.json({
		// 	code: 200
		// })
	} catch (error) {
		// req.flash('error', 'Nhập sai!')
	}
}

// [PATCH] /admin/product/change-position/:id
module.exports.changePosition = async (req, res) => {
	try {
		if (res.locals.role.permisstion.includes("products_edit")) {
			const id = req.params.id
			const position = req.body.position

			await Product.updateOne({
				_id: id
			}, {
				position: position
			})
			// req.flash('success', 'Cập nhật vị trí thành công!');

			res.json({
				code: 200,

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

// [GET] /admin/product/create
module.exports.create = async (req, res) => {
	try {
		const category = await ProductCategory.find({
			deleted: false
		});
		const newCategories = createTreeUtil(category);
		res.render('admin/pages/product/create.pug', {
			pageTitle: 'Trang tạo mới sản phẩm',
			category: newCategories,
		})
	} catch (error) {
		res.redirect('back')
	}
};

// [POST] /admin/product/create
module.exports.createPost = async (req, res) => {
	if (res.locals.role.permisstion.includes("products_create")) {
		try {
			req.body.price = parseInt(req.body.price);
			req.body.discountPercentage = parseInt(req.body.discountPercentage);
			req.body.stock = parseInt(req.body.stock);
			if (req.body.position) {
				req.body.position = parseInt(req.body.position);
			} else {
				const totalProduct = await Product.countDocuments({})
				req.body.position = totalProduct + 1
			}

			req.body.createdBy = res.locals.account.id




			const newProduct = new Product(req.body);
			await newProduct.save();

			req.flash('success', 'Thêm mới sản phẩm thành công!')
			res.redirect(`/${process.env.admin}/product`)
		} catch (error) {
			res.redirect(`/${process.env.admin}/product`)
		}
	}


}

// [GET] /admin/product/edit
module.exports.edit = async (req, res) => {
	try {
		const id = req.params.id;
		const product = await Product.findOne({
			_id: id,
			deleted: false
		})

		const category = await ProductCategory.find({
			deleted: false
		});

		const newCategories = createTreeUtil(category);

		res.render('admin/pages/product/edit.pug', {
			pageTitle: 'Trang chỉnh sửa sản phẩm',
			header: 'Chỉnh sửa sản phẩm',
			product: product,
			category: newCategories,
			buttonTitle: "Quay lại danh sách",
			buttonLink: `/${process.env.admin}/product`
		})
	} catch (error) {
		res.redirect(`/${process.env.admin}/product`)
	}
}

// [PATCH] /admin/product/edit/:id
module.exports.editPatch = async (req, res) => {
	if (res.locals.role.permisstion.includes("products_edit")) {
		try {
			req.body.price = parseInt(req.body.price);
			req.body.discountPercentage = parseInt(req.body.discountPercentage);
			req.body.stock = parseInt(req.body.stock);
			if (req.body.position) {
				req.body.position = parseInt(req.body.position);
			} else {
				const totalProduct = await Product.countDocuments({})
				req.body.position = totalProduct + 1
			}

			const id = req.params.id;
			req.body.updatedBy = res.locals.account.id;
			await Product.updateOne({
				_id: id,
				deleted: false
			}, req.body)

			req.flash('update', ('Cập nhật sản phẩm thành công!'))

			res.redirect('back');
		} catch (error) {
			req.flash("error", 'Cập nhật thất bại!')
			res.redirect('back')
		}
	} else {
		res.json({
			code: 403
		})
	}
}


// [GET] /admin/product/detail/:id
module.exports.detail = async (req, res) => {

	try {
		const id = req.params.id;
		const product = await Product.findOne({
			_id: id,
			deleted: false
		})
		// if (product) {
		const name = await Account.findOne({
			_id: product.createdBy
		}).select("fullName")
		product.createdAtFormat = moment(product.createdAt).format('[Ngày ]DD[ tháng ]MM[ năm ]YYYY [Vào lúc ]HH[ giờ ]mm[ phút ]ss[ giây ]')
		product.createdBy = name.fullName

		if (product.updatedBy) {
			const nameUpdated = await Account.findOne({
				_id: product.updatedBy
			}).select("fullName")
			product.updatedAtFormat = moment(product.updatedAt).format('[Ngày ]DD[ tháng ]MM[ năm ]YYYY [Vào lúc ]HH[ giờ ]mm[ phút ]ss[ giây ]')
			if (nameUpdated.fullName) {
				product.updatedBy = nameUpdated.fullName

			}
		} else {
			product.updatedAtFormat = product.createdAtFormat
			product.updatedBy = name.fullName
		}

		res.render('admin/pages/product/detail.pug', {
			pageTitle: 'Trang chi tiết sản phẩm',
			header: 'Chi tiết sản phẩm',
			product: product
		})
		// } else {
		// 	res.redirect(`/${process.env.admin}/product`)
		// }
	} catch (error) {
		console.log(error)
		// res.redirect(`/${process.env.admin}/product`)
	}
}

// [patch] /admin/product/display-product
module.exports.displayProduct = async (req, res) => {
	const {
		total,
		limit
	} = req.body
	if (limit > total) {
		req.flash("error", "Nhập sai!");
		res.redirect('back')
		return;
	}
	const displayProductDatabase = await DisplayProduct.find({});
	if (displayProductDatabase.length == 0) {
		const newDisplayProduct = new DisplayProduct({
			total: total,
			limit: limit
		})
		await newDisplayProduct.save();
	} else {
		await DisplayProduct.updateOne(displayProductDatabase[0], req.body)
	}
	res.json({
		code: 200
	})
}