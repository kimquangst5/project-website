const Product = require("../../../models/product.model")

// [GET] /admin/trash/product
module.exports.index = async (req, res) => {
	const product = await Product.find({
		deleted: true
	})
	res.render('admin/pages/trash/product/index.pug', {
		pageTitle: 'Trang Thùng rác sản phẩm',
		header: 'Thùng rác sản phẩm',
		product: product,
	})
};

// [PATCH] /admin/trash/product/:id
module.exports.restore = async (req, res) => {
	// if (res.locals.role.permisstion.includes(`trash_view_product`)) {
		try {
			const {
				id
			} = req.params;

			await Product.updateOne({
				_id: id
			}, {
				deleted: false
			})

			console.log(id)
			req.flash('success', 'Khôi phục thành công!')
			res.json({
				code: 200
			})
		} catch (error) {
			res.json({
				code: 400
			})
		}
	// } 
	// else {
	// 	res.json({
	// 		code: 403
	// 	})
	// }

}

// [DELETE] /admin/trash/product/:id
module.exports.delete = async (req, res) => {
	if (res.locals.role.permisstion.includes(`trash_view_product`)) {
		try {
			if (req.params.nameImage) {
				const {
					id,
					nameImage
				} = req.params;
				await Product.deleteOne({
					_id: id
				})
				await uploadCloudMiddlewares.deleteSingle(nameImage);
			} else {
				const {
					id
	
				} = req.params;
				await Product.deleteOne({
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
	else{
		res.json({
			code: 403
		})
	}


}