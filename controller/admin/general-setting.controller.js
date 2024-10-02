const InfoWebsite = require("../../models/info-website.model")
const Email = require("../../models/email.model")
const Phone = require("../../models/phone.model")
const Money = require("../../models/money.model")

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

// [GET] /dashboard/phone
module.exports.phone =  async (req, res)=> {
	const phones = await Phone.find({});
	const result = phones[0].listPhone.join("\n");
	const listPhoneLength = phones[0].listPhone.length
	res.render("admin/pages/setting/phone/index.pug", {
		pageTitle: `Cấu hình số điện thoại`,
		listPhones: result,
		listPhoneLength: listPhoneLength
	})
}

// [[PATCH]] /dashboard/phone
module.exports.phonePatch =  async (req, res)=> {
	let array = req.body.phone
		.split('\n')
		.map(item => item.trim())
     	.filter(item => item !== '');
	console.log(array)
	const phones = await Phone.find({});
	if(phones.length == 0){
		const newPhone = new Phone({
			listPhone: array
		});
		await newPhone.save();
	}
	else{
		await Phone.updateOne(phones[0], {
			listPhone: array
		})
	}
	req.flash("success", "Cập nhật thành công")
	res.redirect('back');
}

// [GET] /dashboard/money
module.exports.money =  async (req, res)=> {
	const moneys = await Money.find({});
	res.render("admin/pages/setting/money/index.pug", {
		pageTitle: "Cấu hình tiền tệ",
		moneys: moneys[0]
	})
}

// [PATCH] /dashboard/money
module.exports.moneyPatch =  async (req, res)=> {
	const separator = req.body.separator
	console.log(separator)
	const moneys = await Money.find({});
	if(moneys.length == 0){
		const newMoney = new Money({
			separator: separator
		})
		await newMoney.save();
	}
	else{
		await Money.updateOne(moneys[0], {
			separator: separator
		})
	}

	req.flash("success", "Cập nhật thành công!");
	res.redirect('back')

}