const Product = require("../models/product.model");

async function getProducts(req, res, next) {
  try {
    const allProducts = await Product.getAllProducts();
    console.log(allProducts)
		res.render("admin/products/allProducts", { allProducts: allProducts});
  } catch (error) {
    next(error);
    return;
  }
}

function getNewProduct(req, res) {
  const emptyProduct = {
    title: '',
    summary: '',
    price: '',
    description: ''
  }
  res.render("admin/products/newProduct", { product: emptyProduct  });
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

async function getUpdateProduct(req, res, next) {
  try {
    const product = await Product.getOneProduct(req.params.id);
		res.render("admin/products/updateProduct", { product: product });
  } catch (error) {
    next(error);
    return;
  }
}

async function updateProduct(req, res, next) {
  const product = new Product({...req.body, _id: req.params.id})
  if (req.file) {
    product.replaceImage(req.file.filename)
  }

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
  getUpdateProduct: getUpdateProduct,
  updateProduct: updateProduct
};
