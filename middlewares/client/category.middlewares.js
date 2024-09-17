const ProductCategory = require('../../models/product-category.model')
const createTreeUtil = require('../../utils/creeteTree.util');
module.exports.category = async (req, res, next)=> {
	const categogyProduct = await ProductCategory.find({
		deleted: false,
		status: "active"
	})

	const newCategories = createTreeUtil(categogyProduct);
	res.locals.categogyProduct = newCategories
	next();
};