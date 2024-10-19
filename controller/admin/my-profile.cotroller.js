const Account = require("../../models/account.model")

module.exports.index = (req, res) => {
	try {
		res.render('admin/pages/my-profile/index.pug', {
			pageTitle: "Thông tin cá nhân"
		})
	} catch (error) {
		res.redirect('back');
	}

};

module.exports.updatePatch = async (req, res) => {
	try {
		await Account.updateOne({
			_id: req.params.id
		}, req.body)
		req.flash("success", "Cập nhật hồ sơ thành công!")
		res.redirect('back')
	} catch (error) {
		res.redirect('back')
	}
};