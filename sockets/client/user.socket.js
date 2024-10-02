const User = require("../../models/user.model");
const streamUpload = require("../../utils/streamUpload.util")


module.exports = (req, res) => {
	const my_user_id = res.locals.infoUser.id
	io.once('connection', async (socket) => {
		console.log('Có 1 người dùng đã kết nối', socket.id);
		socket.on("CLIENT_ADD_FRIEND", async (id) => {
			console.log(id)
			// lời mời đã nhận
			const user = await User.findOne({
				_id: id,
				acceptFriends: my_user_id
			})

			if(!user){
				await User.updateOne({
					_id: id,
				}, {
					$push: {
						acceptFriends: my_user_id
					}
				})
			}

			// GỬI
			const my_user = await User.findOne({
				_id: my_user_id,
				requestFriends: id
			})

			if(!my_user){
				await User.updateOne({
					_id: my_user_id,
				}, {
					$push: {
						requestFriends: id
					}
				})
			}
		});
	});
};