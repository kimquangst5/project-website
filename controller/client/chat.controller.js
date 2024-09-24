module.exports.index = (req, res) => {
	res.render("client/pages/chat/index.pug", {
		pageTitle: "Nhắn tin"
	})
	// res.send("ok")
};