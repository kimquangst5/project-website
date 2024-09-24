const InfoWebsite = require("../../models/info-website.model")
const Email = require("../../models/email.model")

// [GET] /dashboard
module.exports.index = (req, res) => {
	res.render('admin/pages/setting/index.pug', {
		pageTitle: "Cài đặt chung",
		header: "Cấu hình"
	})
};

// [GET] /dashboard/website-info
module.exports.infoWebsite = async (req, res)=> {
	const infoWebsite = await InfoWebsite.find({});
	res.render('admin/pages/setting/Website/website-info.pug', {
		pageTitle: 'Thông tin Website',
		infoWebsite: infoWebsite[0]
	})
};

// [PATCH] /dashboard/website-info
module.exports.infoWebsitePatch =  async (req, res)=> {
	const infoWeb = await InfoWebsite.find({});
	if(infoWeb.length == 0){
		const newinfoWebsite = new InfoWebsite(req.body);
		await newinfoWebsite.save();
	}
	else{
		await InfoWebsite.updateOne(infoWeb[0], req.body)
	}
	
	res.redirect('back')
};

// [GET] /dashboard/email
module.exports.email =  async (req, res)=> {
	const email = await Email.find();
	res.render("admin/pages/setting/email/index.pug", {
		pageTitle: "Cấu hình Email",
		email: email[0]
	})
}

// [PATCH] /dashboard/email
module.exports.emailPatch =  async (req, res)=> {
	const email = await Email.find();
	if(email.length == 0){
		const newEmail = new Email(req.body);
		await newEmail.save();
	}
	else{
		await Email.updateOne(email[0], req.body)
	}
	req.flash("success", "Lưu thành công!")
	res.redirect('back')
}