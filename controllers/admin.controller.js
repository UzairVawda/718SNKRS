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

async function updateSpecificProduct(req, res, next) {
  try {
    const product = await Product.getOneProduct(req.params.id);
    console.log(product)
		res.render("admin/products/updateProduct", { product: product });
  } catch (error) {
    next(error);
    return;
  }
}

async function updateProduct(req, res, next) {
  try {
    const product = await Product.getOneProduct(req.params.id);
    console.log(product)
		res.render("admin/products/updateProduct", { product: product });
  } catch (error) {
    next(error);
    return;
  }
}

module.exports = {
  getProducts: getProducts,
  getNewProduct: getNewProduct,
  getAllOrders: getAllOrders,
  createNewProduct: createNewProduct,
  updateSpecificProduct: updateSpecificProduct,
  updateProduct: updateProduct
};
