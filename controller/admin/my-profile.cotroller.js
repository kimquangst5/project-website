module.exports.index = (req, res) => {
	res.render('admin/pages/my-profile/index.pug', {
		pageTitle: "Thông tin cá nhân"
	})
};