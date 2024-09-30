const Chat = require("../../models/chats.model");
const User = require("../../models/user.model");
module.exports.index = async (req, res) => {
	io.once('connection', async (socket) => {
		console.log('Có 1 người dùng đã kết nối', socket.id);
		
		socket.on("CLIENT_SEND_TYPING", (typing) => {
			socket.broadcast.emit("SERVER_RETURN_TYPING", {
				userId: res.locals.infoUser.id,
				fullName: res.locals.infoUser.fullName,
				type: typing
			})
		});

		socket.on("CLIENT_SEND_MESSAGE", async (message) => {
			const data = {
				userId: res.locals.infoUser.id,
				content: message
			}

			// Lưu data vào database
			const newChats = new Chat(data);
			await newChats.save();

			// Trả tin NHẮN về cho mọi người
			io.emit("SEVER_RETURN_MESSAGE", {
				userId: res.locals.infoUser.id,
				fullName: res.locals.infoUser.fullName,
				content: message
			});
		});

		

		
	});

	const chats = await Chat.find({})
	for (const chat of chats) {
		const user = await User.findOne({
			_id: chat.userId
		})
		if(user.fullName){
			chat.fullName = user.fullName
		}
		
	}


	res.render("client/pages/chat/index.pug", {
		pageTitle: "Nhắn tin",
		chats: chats
	})
	// res.send("ok")
};