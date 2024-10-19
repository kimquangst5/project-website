const RoomChat = require("../../models/rooms-chat.model");
const User = require("../../models/user.model");
module.exports = async (req, res, next) => {
	try {
		if (req.query.user) {
			const user = await User.findOne({
				_id: req.query.user
			}).select('id avatar')
			console.log(user)
			if (!user) {
				req.flash("error", "Không hợp lệ!");
				res.redirect("back");
				return;
			}
		} else {
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

		}
		next()
	} catch (error) {
		req.flash("error", "Không hợp lệ!");
		res.redirect("back");
	}

};