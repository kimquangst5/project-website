const Chat = require("../../models/chats.model");
const User = require("../../models/user.model");
const RoomChat = require("../../models/rooms-chat.model");

const chatSocket = require('../../sockets/client/chat.socket')
module.exports.index = async (req, res) => {
	try {
		if(req.params.roomChatId){
			console.log(req.params.roomChatId)
			const roomChatId = req.params.roomChatId
	
	
			chatSocket(req, res)
			const chats = await Chat.find({
				roomChatId: roomChatId
			})
			for (const chat of chats) {
				const user = await User.findOne({
					_id: chat.userId
				})
				if (user.fullName) {
					chat.fullName = user.fullName
				}
	
			}
		}
		

		const userId = req.query.user
		if(userId){
			const user = await User.findOne({
				_id: userId
			}).select('fullName avatar')
			res.render("client/pages/chat/index.pug", {
				pageTitle: "Nhắn ti",
				user: user
			})
		}
		else{
			const roomChatId = req.params.roomChatId
			const room = await RoomChat.findOne({
				_id: roomChatId,
				deleted: false
			}).select('title')
			res.render("client/pages/chat/index.pug", {
				pageTitle: "Nhắn tin",
				room: room
			})
		}

		

	} catch (error) {

	}

};