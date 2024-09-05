const ProductCategory = require("../../../models/product-category.model")

// [GET] /admin/trash/product-category
module.exports.index = async (req, res) => {
	const categoryProduct = await ProductCategory.find({
		deleted: true
	})
	res.render('admin/pages/trash/product-category/index.pug', {
		pageTitle: 'Trang Thùng rác danh mục sản phẩm',
		header: 'Thùng rác danh mục sản phẩm',
		categoryProduct: categoryProduct,
	})
};

// [PATCH] /admin/trash/product-category/:id
module.exports.restore = async (req, res) => {

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
}

// [DELETE] /admin/trash/product/:id
module.exports.delete = async (req, res) => {
	if (req.params.nameImage) {
		const {
			id,
			nameImage
		} = req.params;
		await ProductCategory.deleteOne({
			_id: id
		})
		await uploadCloudMiddlewares.deleteSingle(nameImage);
	}
	else{
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

}