const mongoose = require('mongoose');

const { Schema } = mongoose

const moneySchema = new Schema({
	separator: String
}, {
	timestamps: true
});

const Money = mongoose.model('Money', moneySchema, 'money');

module.exports = Money;