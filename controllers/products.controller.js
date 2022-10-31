const Product = require("../models/product.model");

async function getAllProducts(req, res) {
  try {
    const allProducts = await Product.getAllProducts();
    res.render("customer/products/allProducts", { allProducts: allProducts });
  } catch (error) {
    next(error);
  }
}

async function getSpecificProduct(req, res, next) {
  try {
    const product = await Product.getOneProduct(req.params.id);
    res.render("customer/products/productDetails", { product: product });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAllProducts: getAllProducts,
  getSpecificProduct: getSpecificProduct,
};
