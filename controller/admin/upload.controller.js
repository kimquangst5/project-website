require('dotenv').config();
const Product = require("../../models/product.model")

module.exports.index = (req, res) => {
	res.json(
		{ location: req.body.file }
	)
};


