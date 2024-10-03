const User = require("../../models/user.model");
const streamUpload = require("../../utils/streamUpload.util")


module.exports = (req, res) => {
	const MY_USER = res.locals.infoUser.id
	io.once('connection', async (socket) => {
		console.log('Có 1 người dùng đã kết nối', socket.id);
		socket.on("CLIENT_ADD_FRIEND", async (id) => {
			console.log(id)
			// lời mời đã nhận
			const user = await User.findOne({
				_id: id,
				acceptFriends: MY_USER
			})

			if(!user){
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
			console.log(my_user)

			if(!my_user){
				await User.updateOne({
					_id: MY_USER,
				}, {
					$push: {
						requestFriends: id
					}
				})
			}
		});

		socket.on("CLIENT_CANCEL_FRIEND", async (id) => {
			console.log(id)
			// lời mời đã nhận
			const user = await User.findOne({
				_id: id,
				acceptFriends: MY_USER
			})

			if(user){
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
			console.log(my_user)

			if(my_user){
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
			console.log(id)
			// lời mời đã nhận
			const user = await User.findOne({
				_id: MY_USER,
				acceptFriends: id
			})

			if(user){
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
			console.log(my_user)

			if(my_user){
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
			
			console.log(MY_USER)
			const user = await User.findOne({
				_id: MY_USER,
				acceptFriends: id
			})

			if(user){
				await User.updateOne({
					_id: MY_USER,
				}, {
					$push: {
						friendsList: id
					},
					$pull: {
						acceptFriends: id
					}
				})
			}

			const my_user = await User.findOne({
				_id: id,
			})
			if(my_user){
				await User.updateOne({
					_id: id,
				}, {
					$push: {
						friendsList: MY_USER
					},
					$pull: {
						requestFriends: MY_USER
					}
				})
			}
		});
	});
};