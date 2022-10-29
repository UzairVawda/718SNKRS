const Product = require("../models/product.model");

async function getAllProducts(req, res) {
	try {
		const allProducts = await Product.getAllProducts()		
		res.render("customer/products/allProducts", {allProducts: allProducts});
	} catch (error) {
		next(error);
	}
}

module.exports = {
	getAllProducts: getAllProducts
}