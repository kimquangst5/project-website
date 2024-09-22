module.exports.index = (req, res)=> {
	res.render('admin/pages/main/index.pug', {
		pageTitle: 'Trang chủ Admin',
	})
};

