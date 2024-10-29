// const InterfaceBoxProduct = require(`../../models/interface.model`)

module.exports.index = (req, res) => {
	try {
		res.render(`admin/pages/interface/index.pug`, {
			pageTitle: `Giao diện`
		})
	} catch (error) {
		console.log(error)
		res.redirect(`back`);
	}
};

// module.exports.edit = (req, res) => {

// 	try {
// 		res.render(`admin/pages/interface/edit.pug`, {
// 			pageTitle: `Chỉnh sửa giao diện`
// 		})
// 	} catch (error) {
// 		res.redirect(`back`);
// 	}
// }

// module.exports.editBoxProduct = async (req, res) => {
// 	try {
// 		const box = await InterfaceBoxProduct.find({})
// 		res.render(`admin/pages/interface/box-product/index.pug`, {
// 			pageTitle: `Chỉnh sửa hộp sản phẩm`,
// 			box: box[0]
// 		})
// 	} catch (error) {
// 		res.redirect(`back`);
// 	}
// }

// module.exports.editBoxProductPatch = async (req, res) => {
// 	const cnt = await InterfaceBoxProduct.find({});
// 	if (cnt.length == 0) {
// 		const newBox = new InterfaceBoxProduct(req.body);
// 		await newBox.save();

// 	} else {
// 		await InterfaceBoxProduct.updateOne(cnt[0], req.body)
// 	}
// 	req.flash(`success`, `Cập nhật thành công!`)
// 	res.redirect(`back`);
// }