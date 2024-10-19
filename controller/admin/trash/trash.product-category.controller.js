const ProductCategory = require("../../../models/product-category.model")
const Account = require("../../../models/account.model")
const moment = require('moment')

// [GET] /admin/trash/product-category
module.exports.index = async (req, res) => {
	try {
		const categoryProduct = await ProductCategory.find({
			deleted: true
		})

		for (const item of categoryProduct) {
			if (item.deletedBy) {
				const account = await Account.findOne({
					_id: item.deletedBy
				})
				item.deletedBy = account.fullName
			}
			item.updatedAtFormat = moment(item.updatedAt).format('DD/MM/YY-HH/mm')

		}
		res.render('admin/pages/trash/product-category/index.pug', {
			pageTitle: 'Trang Thùng rác danh mục sản phẩm',
			header: 'Thùng rác danh mục sản phẩm',
			categoryProduct: categoryProduct,
		})
	} catch (error) {
		res.redirect('back');
	}

};

// [PATCH] /admin/trash/product-category/:id
module.exports.restore = async (req, res) => {
	try {
		const {
			id
		} = req.params;

		await ProductCategory.updateOne({
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

// [DELETE] /admin/trash/product/:id
module.exports.delete = async (req, res) => {
	try {
		if (req.params.nameImage) {
			const {
				id,
				nameImage
			} = req.params;
			await ProductCategory.deleteOne({
				_id: id
			})
			await uploadCloudMiddlewares.deleteSingle(nameImage);
		} else {
			const {
				id
	
			} = req.params;
			await ProductCategory.deleteOne({
				_id: id
			})
		}
		req.flash('success', 'Xóa vĩnh viễn thành công!')
	
		res.json({
			code: 200
		})
	} catch (error) {
		res.json({
			code: 400
		})
	}

}