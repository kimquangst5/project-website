const Menu = require("../../../../models/header-menu.model.js")
module.exports.index = async (req, res) => {
	res.render(`admin/pages/interface/config/config.pug`, {
		pageTitle: `Cài đặt giao diện`
	})
};

module.exports.menu = async (req, res) => {
	const listmenu = await Menu
		.find({

		})
		.sort(
			{
				title: 'desc'
			}
		)

	res.render(`admin/pages/interface/config/menu.pug`, {
		pageTitle: `Cài đặt giao diện`,
		listmenu: listmenu
	})
};


module.exports.menuPost = async (req, res) => {
	
	const array = [];
	req.body.forEach(async (it) => {
		if(it.id){
			array.push(it.id)
			await Menu.updateOne({
				_id: it.id
			}, it)
		}
		else{
			const newMenu = new Menu(it);
			await newMenu.save();
		}
	});
	console.log(array)
	const listDelete = await Menu.find({
		_id: {
			$nin: array
		}
	}).select('id')
	console.log(listDelete)
	let arrayListDelete = []
	listDelete.forEach(async (it) => {
		arrayListDelete.push(it.id)
	})
	console.log(arrayListDelete)
	await Menu.deleteMany({_id: arrayListDelete})
	

	res.json({
		code: 200
	})
};
