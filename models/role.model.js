const mongoose = require('mongoose');

const { Schema } = mongoose

const roleShema = new Schema({
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

const Role = mongoose.model('Role', roleShema, 'roles');

module.exports = Role;