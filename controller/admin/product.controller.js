const Product = require('../../models/product.model');
require('dotenv').config();

// [GET] /admin/product/
module.exports.index = async (req, res) => {

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
	let pagination = {
		current: 1,
		limit: 5
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
	const fillerStatus = [
		{
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
	const statusOption = [
		{
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


	const product = await Product
		.find(find)
		.limit(pagination.limit)
		.skip(pagination.skip)
		.sort({
			position: 'desc',
			// updatedAt: 'desc'
		})

	for (const it of product) {
		it.priceNew = it.price - (it.price * it.discountPercentage) / 100
		it.priceNew = it.priceNew.toFixed(2);
	}

	res.render('admin/pages/product/index.pug', {
		pageTitle: 'Trang quản lí sản phẩm',
		header: 'Quản lí sản phẩm',
		product: product,
		key: key,
		pagination: pagination,
		fillerStatus: fillerStatus,
		statusOption: statusOption,
	})
};

// [PATCH] /admin/product/change-status/:status/:id
module.exports.changeStatus = async (req, res) => {
	const { status, id } = req.params;

	req.flash('success', 'Thanks! Cập nhật trạng thái thành công!');

	await Product.updateOne({
		_id: id
	}, {
		status: status
	});
	// res.redirect('back')

	res.json({
		code: 200
	})
}

// [PATCH] /admin/product/change-multi
module.exports.changeMulti = async (req, res) => {

	const { status, ids } = req.body;
	if (status == 'active') {
		req.flash('success', `Thanks! Cập nhật trạng thái thành Hoạt động thành công!`);
	}
	else {
		req.flash('success', `Thanks! Cập nhật trạng thái thành Dừng hoạt động thành công!`);
	}

	if (status == 'deleted-product') {
		await Product.updateMany({
			_id: ids
		}, {
			deleted: true
		});
	}
	await Product.updateMany({
		_id: ids
	}, {
		status: status
	});

	res.json({
		code: 200
	})
}

// [PATCH] /admin/product/delete/:id
module.exports.delete = async (req, res) => {
	try {
		const { id } = req.params;
		await Product.updateOne({
			_id: id
		}, {
			deleted: true
		})

		req.flash('success', 'Thanks! Xóa sản phẩm thành công!');

		res.json({
			code: 200
		})
	} catch (error) {
		req.flash('error', 'Bạn nhập sai ID!')
	}

}

// [GET] /admin/product/trash
module.exports.trash = async (req, res) => {

	let find = {
		deleted: true
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
	let pagination = {
		current: 1,
		limit: 5
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
	const fillerStatus = [
		{
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

	const product = await Product
		.find(find)
		.limit(pagination.limit)
		.skip(pagination.skip)


	for (const it of product) {
		it.priceNew = it.price - (it.price * it.discountPercentage) / 100
		it.priceNew = it.priceNew.toFixed(2);
	}

	const deleteOption = [
		{
			lable: 'Chọn hành động ... ',
			value: ''
		},
		{
			lable: 'Khôi phục các sản phẩm đã chọn',
			value: 'restore'
		},
		{
			lable: 'Xóa vĩnh viễn các sản phẩm đã chọn', //perma deleted
			value: 'permanentlyDelete'
		}
	]

	res.render('admin/pages/trash/index.pug', {
		pageTitle: 'Trang Thùng rác',
		header: 'Thùng rác',
		product: product,
		key: key,
		pagination: pagination,
		fillerStatus: fillerStatus,
		deleteOption: deleteOption
	})
};

// [PATCH] /admin/product/trash/:id
module.exports.trashRestore = async (req, res) => {

	const { id } = req.params;

	await Product.updateOne({
		_id: id
	}, {
		deleted: false
	})

	req.flash('success', 'Khôi phục sản phẩm thành công!')

	res.json({
		code: 200
	})
}

// [DELETE] /admin/product/trash/:id
module.exports.trashPermanentlyDelete = async (req, res) => {

	const { id } = req.params;

	await Product.deleteOne({
		_id: id
	})

	res.json({
		code: 200
	})
}

// [PATCH] /admin/product/change-multi-restore
module.exports.changeMultiRestore = async (req, res) => {
	try {

		const { status, ids } = req.body;
		if (status == 'restore') {
			await Product.updateMany({
				_id: ids
			}, {
				deleted: false
			})
			req.flash('success', 'Khôi phục sản phẩm thành công!')
		}

		if (status == 'permanentlyDelete') {
			await Product.deleteMany({
				_id: ids
			})
			req.flash('success', 'Xóa vĩnh viễn sản phẩm thành công!')
		}


		res.json({
			code: 200
		})
	} catch (error) {
		req.flash('error', 'Nhập sai!')
	}
}

// [PATCH] /admin/product/change-position/:id
module.exports.changePosition = async (req, res) => {

	req.flash('success', 'Thanks! Cập nhật vị trí thành công!');

	const id = req.params.id
	const position = req.body.position

	await Product.updateOne({
		_id: id
	}, {
		position: position
	})

	res.json({
		code: 200
	})
}

// [GET] /admin/product/create
module.exports.create = async (req, res) => {


	res.render('admin/pages/product/create.pug', {
		pageTitle: 'Trang tạo mới sản phẩm',
		header: 'Tạo mới sản phẩm',
	})
};

// [POST] /admin/product/create
module.exports.createPost = async (req, res) => {

	if (req.file && req.file.filename) {
		req.body.thumbnail = `/uploads/${req.file.filename}`
	}

	req.body.price = parseInt(req.body.price);
	req.body.discountPercentage = parseInt(req.body.discountPercentage);
	req.body.stock = parseInt(req.body.stock);
	if (req.body.position) {
		req.body.position = parseInt(req.body.position);
	} else {
		const totalProduct = await Product.countDocuments({})
		req.body.position = totalProduct + 1
	}

	const newProduct = new Product(req.body);
	await newProduct.save();

	req.flash('success', 'Thêm mới sản phẩm thành công!')

	res.redirect(`/${process.env.admin}/product`)

}

// [GET] /admin/product/create
module.exports.edit = async (req, res) => {
	const id = req.params.id;

	try {
		const product = await Product.findOne({
			_id: id,
			deleted: false
		})

		res.render('admin/pages/product/edit.pug', {
			pageTitle: 'Trang chỉnh sửa sản phẩm',
			header: 'Chỉnh sửa sản phẩm',
			product: product
		})
	} catch (error) {
		res.redirect(`/${process.env.admin}/product`)
	}
}

// [PATCH] /admin/product/edit/:id
module.exports.editPatch = async (req, res) => {
	try {
		if (req.file && req.file.filename) {
			req.body.thumbnail = `/uploads/${req.file.filename}`
		}

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

		await Product.updateOne({
			_id: id,
			deleted: false
		}, req.body)

		req.flash('success', 'Cập nhật thành công!')

		res.redirect('back');
	} catch (error) {
		res.redirect(`/${process.env.admin}/product`)
	}
}


// [GET] /admin/product/detail/:id
module.exports.detail = async (req, res) => {
	const id = req.params.id;

	try {
		const product = await Product.findOne({
			_id: id,
			deleted: false
		})
		if(product){

			res.render('admin/pages/product/detail.pug', {
				pageTitle: 'Trang chi tiết sản phẩm',
				header: 'Chi tiết sản phẩm',
				product: product
			})
		}
		else{
			res.redirect(`/${process.env.admin}/product`)
		}
	} catch (error) {
		res.redirect(`/${process.env.admin}/product`)
	}
}