const Product = require("../models/product.model");
const Order = require("../models/order.model");

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
  const emptyProduct = {
    title: "",
    summary: "",
    price: "",
    description: "",
  };
  res.render("admin/products/newProduct", { product: emptyProduct });
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
  const product = new Product({ ...req.body, _id: req.params.id });
  if (req.file) {
    product.replaceImage(req.file.filename);
  }

  try {
    await product.saveProduct();
  } catch (error) {
    next(error);
    return;
  }
  res.redirect("/admin/products");
}

async function deleteProduct(req, res, next) {
  let product;
  try {
    product = await Product.getOneProduct(req.params.id);
    await product.remove();
    res.res;
  } catch (error) {
    next(error);
    return;
  }
  res.json({ message: "Deleted product!" });
}

async function getOrders(req, res) {
  try {
    const orders = await Order.findAllOrders();
    res.render("admin/orders/allOrders", {
      allOrders: orders,
    });
  } catch (error) {
    next(error);
  }
}

async function updateOrder(req, res, next) {
  const orderId = req.params.id;
  const newStatus = req.body.newStatus;
  try {
    const order = await Order.findByOrderId(orderId);
    order.status = newStatus;
    await order.save();
    res.json({ message: "Status Updates", newStatus: newStatus });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getProducts: getProducts,
  getNewProduct: getNewProduct,
  getAllOrders: getAllOrders,
  createNewProduct: createNewProduct,
  getUpdateProduct: getUpdateProduct,
  updateProduct: updateProduct,
  deleteProduct: deleteProduct,
  getOrders: getOrders,
  updateOrder: updateOrder,
};
