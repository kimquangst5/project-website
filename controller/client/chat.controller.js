module.exports.index = (req, res) => {
	io.on('connection', (socket) => {
		console.log('Có 1 người dùng đã kết nối', socket.id);
		socket.on("CLIENT_SEND_MESSAGE", (message) => {
			console.log(message)
		});
	});

	res.render("client/pages/chat/index.pug", {
		pageTitle: "Nhắn tin"
	})
	// res.send("ok")
};