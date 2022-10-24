const Product = require("../models/product.model");

async function getProducts(req, res, next) {
  try {
    const allProducts = await Product.getAllProducts();
		res.render("admin/products/allProducts", { allProducts: allProducts });
  } catch (error) {
    next(error);
    return;
  }
}

function getNewProduct(req, res) {
  res.render("admin/products/newProduct");
}

function getAllOrders(req, res) {
  res.render("admin/products/allOrders");
}

async function createNewProduct(req, res, next) {
  const product = new Product({ ...req.body, productImage: req.file.filename });

  try {
    await product.saveProduct();
  } catch (error) {
    next(error);
    return;
  }

  res.redirect("/admin/products");
}

module.exports = {
  getProducts: getProducts,
  getNewProduct: getNewProduct,
  getAllOrders: getAllOrders,
  createNewProduct: createNewProduct,
};
