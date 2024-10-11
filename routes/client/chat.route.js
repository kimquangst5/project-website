const express = require("express");
const router = express.Router();
const controller = require("../../controller/client/chat.controller")
const roomChatMiddlewares = require('../../middlewares/client/roomChat-middleware')

router.get(
	'/:roomChatId',
	roomChatMiddlewares,
	controller.index)

module.exports = router