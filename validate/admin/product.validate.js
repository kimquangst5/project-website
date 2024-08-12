module.exports.createPost = async (req, res, next)=> {
	if(!req.body.title){
		req.flash('error', 'Bạn chưa nhập tiêu đề!!!');
		res.redirect('back');
		return;
	}

	if(!req.body.price){
		req.flash('error', 'Bạn chưa nhập giá!!!');
		res.redirect('back');
		return;
	}

	if(!req.body.stock){
		req.flash('error', 'Bạn chưa nhập số lượng!!!');
		res.redirect('back');
		return;
	}

	if(req.body.discountPercentage < 0 || req.body.discountPercentage > 100){
		req.flash('error', '% Giảm giá phải từ 0 đến 100!!!');
		res.redirect('back');
		return;
	}

	if(req.body.stock <= 0){
		req.flash('error', 'Số lượng phải có ít nhất 1 sản phẩm!');
		res.redirect('back');
		return;
	}
	
	next();
}