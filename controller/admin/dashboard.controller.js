module.exports.index = (req, res)=> {
	res.render('admin/pages/dashboard/index.pug', {
		pageTitle: 'Trang chủ Admin',
		header: 'Tổng quan'
	})
};