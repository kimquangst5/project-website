const Money = require('../models/money.model')

module.exports.cham = (value) => {
	return value.toLocaleString('de-DE');
};

module.exports.phay = (value) => {
	return value.toLocaleString('en-EN');
};