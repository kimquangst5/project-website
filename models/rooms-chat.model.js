const mongoose = require('mongoose');

const { Schema } = mongoose

const roomsChatShema = new Schema({
	title: String,
	avatar: String,
	typeRoom: String,
	users: [
		{
			userId: String,
			role: String,
			name: String
		}
	],
	deleted: {
		type: Boolean,
		default: false
	}
	
}, {
	timestamps: true
});

const RoomChat = mongoose.model('RoomChat', roomsChatShema, 'rooms-chat');

module.exports = RoomChat;