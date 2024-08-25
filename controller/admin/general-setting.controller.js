module.exports.index = (req, res) => {
	res.render('admin/pages/general setting/index.pug', {
		pageTitle: "Cài đặt chung",
		header: "Cấu hình"
	})
};