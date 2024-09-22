const InfoWebsite = require("../../models/info-website.model")

module.exports.index = (req, res) => {
	res.render('admin/pages/setting/index.pug', {
		pageTitle: "Cài đặt chung",
		header: "Cấu hình"
	})
};

module.exports.infoWebsite = async (req, res)=> {
	const infoWebsite = await InfoWebsite.find({});
	console.log(infoWebsite[0])
	res.render('admin/pages/setting/Website/website-info.pug', {
		pageTitle: 'Thông tin Website',
		infoWebsite: infoWebsite[0]
	})
};

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