module.exports.createPost = async (req, res, next)=> {
	if(!req.body.title){
		await req.flash('error', 'Bạn chưa nhập tiêu đề!!!');
		res.redirect('back');
		return;
	}

	if(!req.body.price){
		await req.flash('error', 'Bạn chưa nhập giá!!!');
		res.redirect('back');
		return;
	}

	if(!req.body.stock){
		await req.flash('error', 'Bạn chưa nhập số lượng!!!');
		res.redirect('back');
		return;
	}

	if(req.body.discountPercentage < 0 || req.body.discountPercentage > 100){
		await req.flash('error', '% Giảm giá phải từ 0 đến 100!!!');
		res.redirect('back');
		return;
	}

	if(req.body.stock <= 0){
		await req.flash('error', 'Số lượng phải có ít nhất 1 sản phẩm!');
		res.redirect('back');
		return;
	}
	
	next();
}