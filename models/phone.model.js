const mongoose = require('mongoose');

const { Schema } = mongoose

const phoneShema = new Schema({
	listPhone: Array
}, {
	timestamps: true
});

const Phone = mongoose.model('Phone', phoneShema, 'phone');

module.exports = Phone;