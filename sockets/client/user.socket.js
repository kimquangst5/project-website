const User = require("../../models/user.model");
const RoomChat = require("../../models/rooms-chat.model");
const streamUpload = require("../../utils/streamUpload.util")


module.exports = (req, res) => {
	const MY_USER = res.locals.infoUser.id
	io.once('connection', async (socket) => {
		console.log('Có 1 người dùng đã kết nối', socket.id);
		socket.on("CLIENT_ADD_FRIEND", async (id) => {
			// lời mời đã nhận
			const user = await User.findOne({
				_id: id,
				acceptFriends: MY_USER
			})

			
			if (!user) {
				await User.updateOne({
					_id: id,
				}, {
					$push: {
						acceptFriends: MY_USER
					}
				})
			}
			
			// lời mời đã gửi
			const my_user = await User.findOne({
				_id: MY_USER,
				requestFriends: id
			})
			
			if (!my_user) {
				await User.updateOne({
					_id: MY_USER,
				}, {
					$push: {
						requestFriends: id
					}
				})
			}

			const my_user_req = await User.findOne({
				_id: MY_USER,
				requestFriends: id
			})
			socket.emit("SEVER_RETURN_REQUEST_LENGTH", {
				id: my_user_req.id,
				length: my_user_req.requestFriends.length
			})
			const my_user_ace = await User.findOne({
				_id: id,
				acceptFriends: MY_USER
			})
			console.log(my_user_ace)
			socket.broadcast.emit("SEVER_RETURN_ACCEPT_LENGTH", {
				id: my_user_ace.id,
				length: my_user_ace.acceptFriends.length
			})
			
		});

		socket.on("CLIENT_CANCEL_FRIEND", async (id) => {
			// lời mời đã nhận
			const user = await User.findOne({
				_id: id,
				acceptFriends: MY_USER
			})

			if (user) {
				await User.updateOne({
					_id: id,
				}, {
					$pull: {
						acceptFriends: MY_USER
					}
				})
			}

			// lời mời đã gửi
			const my_user = await User.findOne({
				_id: MY_USER,
				requestFriends: id
			})

			if (my_user) {
				await User.updateOne({
					_id: MY_USER,
				}, {
					$pull: {
						requestFriends: id
					}
				})
			}
		});

		socket.on("CLIENT_REFUSE_FRIEND", async (id) => {
			// lời mời đã nhận
			const user = await User.findOne({
				_id: MY_USER,
				acceptFriends: id
			})

			if (user) {
				await User.updateOne({
					_id: MY_USER,
				}, {
					$pull: {
						acceptFriends: id
					}
				})
			}

			// lời mời đã gửi
			const my_user = await User.findOne({
				_id: id,
				requestFriends: MY_USER
			})

			if (my_user) {
				await User.updateOne({
					_id: id,
				}, {
					$pull: {
						requestFriends: MY_USER
					}
				})
			}
		});

		socket.on("CLIENT_ACCEPT_FRIEND", async (id) => {

			const user = await User.findOne({
				_id: MY_USER,
				acceptFriends: id
			})

			const newRoomChat = new RoomChat({
				// avatar: String,
				typeRoom: "friend",
				users: [
					{
						userId: MY_USER,
						role: "superAdmin",
						// name: String
					},
					{
						userId: id,
						role: "superAdmin",
						// name: String
					}
				]
				
			})
			await newRoomChat.save();

			if (user) {
				await User.updateOne({
					_id: MY_USER,
				}, {
					$push: {
						friendsList: {
							userId: id,
							roomChatId: newRoomChat.id,
						}
					},
					$pull: {
						acceptFriends: id
					}
				})
			}

			const my_user = await User.findOne({
				_id: id,
				friendsList: MY_USER
			})
			if (!my_user) {
				await User.updateOne({
					_id: id,
				}, {
					$push: {
						friendsList: {
							userId: MY_USER,
							roomChatId: newRoomChat.id,
						}
					},
					$pull: {
						requestFriends: MY_USER
					}
				})
			}
		});
	});
};