const mongoose = require('mongoose');

const { Schema } = mongoose

const roomsChatShema = new Schema({
	title: String,
	avatar: {
		type: String,
		default: 'https://res.cloudinary.com/djp6njpi7/image/upload/v1727712011/t4zn8pou7attrc00a0ib.png'
	},
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