module.exports.index = (req, res) => {
	res.render("admin/pages/articles/index.pug", {
		pageTitle: "Trang bài viết"
	})
};

module.exports.create = (req, res) => {
	res.render("admin/pages/articles/create.pug", {
		pageTitle: "Thêm bài viết"
	})
};