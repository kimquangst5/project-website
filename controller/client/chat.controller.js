const Chat = require("../../models/chats.model");
const User = require("../../models/user.model");

const chatSocket = require('../../sockets/client/chat.socket')
module.exports.index = async (req, res) => {
	try {
		const roomChatId = req.params.roomChatId
		const userId = req.params.userId

		chatSocket(req, res)
		const chats = await Chat.find({
			roomChatId: roomChatId
		})
		const user = await User.findOne({
			_id: userId
		})
		console.log(chats)
		for (const chat of chats) {
			const user = await User.findOne({
				_id: chat.userId
			})
			if (user.fullName) {
				chat.fullName = user.fullName
			}

		}

		res.render("client/pages/chat/index.pug", {
			pageTitle: "Nhắn tin",
			chats: chats,
			user: user
		})
	} catch (error) {

	}

};