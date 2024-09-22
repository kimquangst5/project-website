const mongoose = require('mongoose');

const { Schema } = mongoose

const settingSchema = new Schema({
	title: String,
	description: String,
	createdBy: String,
	deletedBy: String,
	permisstion: { //phân quyền
		type: Array,
		default: []
	},
	deleted: {
		type: Boolean,
		default: false
	},
}, {
	timestamps: true
});

const Setting = mongoose.model('Setting', settingSchema, 'settings');

module.exports = Setting;