const RoomChat = require("../../models/rooms-chat.model")
const User = require("../../models/user.model")

// [GET] /roomchat
module.exports.index = async (req, res) => {
	const myUser = res.locals.infoUser
	const listRoom = await RoomChat.find({
		typeRoom: "group",
		"users.userId": myUser.id
	})
	res.render("client/pages/rooms-chat/index.pug", {
		pageTitle: "Danh sách phòng",
		listRoom: listRoom
	})
};

// [GET] /roomchat/create
module.exports.create = async (req, res) => {
	const friendsList = res.locals.infoUser.friendsList
	for (const friend of friendsList) {
		const user = await User.findOne({
			_id: friend.userId,
			deleted: false,
			status: 'active'
		}).select('id fullName')
		friend.fullName = user.fullName
	}
	res.render("client/pages/rooms-chat/create.pug", {
		pageTitle: "Tạo phòng",
		friendsList: friendsList
	})
};

// [POST] /roomchat/create
module.exports.createPost = async (req, res) => {
	try {
		const myUser = res.locals.infoUser

		const title = req.body.title
		const listMember = req.body.listMember
		console.log(req.body)
		const dataRoomChat = {
			title: title,
			typeRoom: 'group',
			users: []
		}
		dataRoomChat.users.push({
			userId: myUser.id,
			role: 'supperAdmin',
		})
		listMember.forEach(userId => {
			dataRoomChat.users.push({
				userId: userId,
				role: 'member',
			})
		})
		console.log(dataRoomChat)
		const newRoom = new RoomChat(dataRoomChat);
		await newRoom.save();
		res.redirect(`/chat/${newRoom.id}`);
	} catch (error) {

	}

};