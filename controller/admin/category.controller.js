require('dotenv').config();
const uploadCloudMiddlewares = require('../../middlewares/admin/uploadCloud.middlewares');
const ProductCategory = require('../../models/product-category.model')
const createTreeUtil = require('../../utils/creeteTree.util');

// [GET] /admin/product-category/
module.exports.index = async (req, res) => {
	const records = await ProductCategory
		.find({
			deleted: false
		})
		.sort({
			position: 'desc'
		})

	res.render('admin/pages/category/index.pug', {
		pageTitle: 'Trang danh mục sản phẩm',
		header: 'Danh mục sản phẩm',
		records: records,
		buttonSubmit: "+ Thêm mới",
		link2: `/${process.env.admin}/product-category/create`
	})
};

// [GET] /admin/product-category/create
module.exports.create = async (req, res) => {
	const category = await ProductCategory.find({
		deleted: false
	});


	const newCategories = createTreeUtil(category);
	
	res.render('admin/pages/category/create.pug', {
		pageTitle: 'Trang thêm mới danh mục sản phẩm',
		header: 'Thêm mới danh mục sản phẩm',
		category: newCategories
	})
}

// [POST] /admin/product-category/create
module.exports.createPost = async (req, res) => {
	if (req.body.position) {
		req.body.position = parseInt(req.body.position)
	}
	else {
		let total = await ProductCategory.countDocuments();
		req.body.position = parseInt(total) + 1;
	}

	const newProductCategory = new ProductCategory(req.body);
	await newProductCategory.save();

	req.flash('success', 'Thêm mới danh mục thành công!')

	res.redirect(`/${process.env.admin}/product-category`)
}


// [POST] /admin/product-category/delete/:id
module.exports.deletePatch = async (req, res) => {
	const { id } = req.params;

	await ProductCategory.updateOne({
		_id: id
	}, {
		deleted: true
	})

	req.flash('success', 'Xóa danh mục thành công!')
	res.json({
		code: 200
	})
}

// [POST] /admin/product-category/edit/:id
module.exports.edit = async (req, res) => {
	const category = await ProductCategory.find({
		deleted: false
	});

	const newCategories = createTreeUtil(category);

	const { id } = req.params;
	const product = await ProductCategory.findOne({
		_id: id
	})

	res.render('admin/pages/category/edit.pug', {
		pageTitle: 'Trang chỉnh sửa danh mục',
		header: 'Chỉnh sửa danh mục',
		category: newCategories,
		product: product
	});
}

// [PATCH] /admin/product-category/editPatch/:id
module.exports.editPatch = async (req, res) => {
	try {
		const { id } = req.params;
		const check = await ProductCategory.findOne({
			_id: id
		});

		if (check) {
			if (req.body.position) {
				req.body.position = parseInt(req.body.position)
			}
			else {
				let total = await ProductCategory.countDocuments();
				req.body.position = parseInt(total) + 1;
			}
			const categoryNew = await ProductCategory.updateMany({
				_id: id,
				deleted: false
			}, req.body);
			req.flash('success', 'Cập nhật Danh mục thành công!');
			res.redirect(`back`)
		}
		else{
			res.redirect(`/${admin}/product-category`)
		}

	} catch (error) {
		res.redirect(`/${process.env.admin}/product-category`)
	}

}