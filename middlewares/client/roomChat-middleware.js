const RoomChat = require("../../models/rooms-chat.model");
module.exports = async (req, res, next) => {
	try {
		const roomChatId = req.params.roomChatId
		if (roomChatId) {
			const rommschats = await RoomChat.findOne({
				_id: roomChatId,
				"users.userId": res.locals.infoUser.id
			})
			if (!rommschats) {
				req.flash("error", "Phòng chat không hợp lệ!");
				res.redirect("back");
				return;
			}
		}
		next()
	} catch (error) {
		req.flash("error", "Không hợp lệ!");
		res.redirect("back");
	}

};