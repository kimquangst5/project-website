const Chat = require("../../models/chats.model");
const User = require("../../models/user.model");
const chatSocket = require('../../sockets/client/chat.socket')
module.exports.index = async (req, res) => {
	
	chatSocket(req, res)
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
};