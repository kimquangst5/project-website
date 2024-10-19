const Chat = require("../../models/chats.model");
const streamUpload = require("../../utils/streamUpload.util")


module.exports = (req, res) => {
	const roomChatId = req.params.roomChatId
	io.once('connection', async (socket) => {
		console.log('Có 1 người dùng đã kết nối', socket.id);
		socket.join(roomChatId);
		socket.on("CLIENT_SEND_TYPING", (typing) => {
			socket.broadcast.to(roomChatId).emit("SERVER_RETURN_TYPING", {
				userId: res.locals.infoUser.id,
				fullName: res.locals.infoUser.fullName,
				type: typing
			})
		});

		socket.on("CLIENT_SEND_MESSAGE", async (data) => {
			console.log(data)
			const chatData = {
				userId: res.locals.infoUser.id,
				content: data.message,
				roomChatId: roomChatId
			}

			let listLinkImages = [];
			for (const image of data.imgaes) {
				const result = await streamUpload(image)
				listLinkImages.push(result.url)
			}

			if (listLinkImages.length > 0) {
				chatData.images = listLinkImages
			}

			// Lưu data vào database
			const newChats = new Chat(chatData);
			await newChats.save();

			// Trả tin NHẮN về cho mọi người
			io.to(roomChatId).emit("SEVER_RETURN_MESSAGE", {
				userId: res.locals.infoUser.id,
				fullName: res.locals.infoUser.fullName,
				content: data.message,
				images: chatData.images
			});
		});
	});
};