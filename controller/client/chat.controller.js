const Chat = require("../../models/chats.model");
const User = require("../../models/user.model");
const RoomChat = require("../../models/rooms-chat.model");
const chatSocket = require('../../sockets/client/chat.socket')
module.exports.index = async (req, res) => {
	const roomChatId = req.params.roomChatId
	if(roomChatId){
		const rommschats = await RoomChat.findOne({
			_id: roomChatId
		})
		const listId = rommschats.users.map(user => user.userId)
		let check = listId.find(id => id == res.locals.infoUser.id);
		if(!check){
			req.flash("error", "Phòng chat không hợp lệ!");
			res.redirect("/");
			return;
		}
	}
	// console.log(req.params.roomChatId)

	chatSocket(req, res)
	const chats = await Chat.find({
		roomChatId: req.params.roomChatId
	})
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
};