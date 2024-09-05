require('dotenv').config();
const Product = require("../../models/product.model")

module.exports.index = (req, res) => {
	res.render("admin/pages/trash/index.pug", {
		pageTitle: 'Trang Thùng rác',
		header: 'Thùng rác',
	})
};


