module.exports.createPost = async (req, res, next)=> {
	if(!req.body.title){
		req.flash('error', 'Bạn chưa nhập tên danh mục!!!');
		res.redirect('back');
		return;
	}

	next();
}