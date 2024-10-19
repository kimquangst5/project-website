require('dotenv').config();
const Product = require("../../models/product.model")

module.exports.index = (req, res) => {
	try {
		res.render("admin/pages/trash/index.pug", {
			pageTitle: 'Trang Thùng rác',
			header: 'Thùng rác',
		})
	} catch (error) {
		res.redirect('back');
	}
};


