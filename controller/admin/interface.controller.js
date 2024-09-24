const InterfaceBoxProduct = require("../../models/interface.model")

module.exports.index = (req, res) => {
	res.render('admin/pages/interface/index.pug', {
		pageTitle: "Giao diện"
	})
};

module.exports.edit = (req, res) => {
	res.render('admin/pages/interface/edit.pug', {
		pageTitle: "Chỉnh sửa giao diện"
	})
}

module.exports.editBoxProduct = async (req, res) => {
	const box = await  InterfaceBoxProduct.find({})
	res.render('admin/pages/interface/box-product/index.pug', {
		pageTitle: "Chỉnh sửa hộp sản phẩm",
		box: box[0]
	})
}

module.exports.editBoxProductPatch = async (req, res) => {
	const cnt = await InterfaceBoxProduct.find({});
	if(cnt.length == 0){
		const newBox = new InterfaceBoxProduct(req.body);
		await newBox.save();
		
	}
	else{
		await InterfaceBoxProduct.updateOne(cnt[0], req.body)
	}
	req.flash("success", "Cập nhật thành công!")
	res.redirect('back');
}