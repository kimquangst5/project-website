const Menu = require("../../../../models/header-menu.model.js")
module.exports.index = async (req, res) => {
	res.render(`admin/pages/interface/customize/dashboard.pug`, {
		pageTitle: `Chỉnh sửa giao diện`
	})
};

module.exports.header = async (req, res) => {
	res.render(`admin/pages/interface/customize/header.pug`, {
		pageTitle: `Chỉnh sửa giao diện header`,
	})
};

