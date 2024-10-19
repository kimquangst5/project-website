const mongoose = require('mongoose');

const { Schema } = mongoose

const chatSchema = new Schema({
	userId: String,
	roomChatId: String,
	content: String,
	avatar: {
		type: Array,
	},
}, {
	timestamps: true
});

const Chat = mongoose.model('Chat', chatSchema, 'chats');

module.exports = Chat;