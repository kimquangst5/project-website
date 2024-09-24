const Account = require("../../models/account.model")

module.exports.index = (req, res) => {
	res.render('admin/pages/my-profile/index.pug', {
		pageTitle: "Thông tin cá nhân"
	})
};

module.exports.updatePatch = async (req, res) => {
	await Account.updateOne({
		_id: req.params.id
	}, req.body)
	req.flash("success", "Cập nhật hồ sơ thành công!")
	res.redirect('back')
};