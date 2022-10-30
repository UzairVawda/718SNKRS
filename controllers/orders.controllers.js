const Order = require("../models/order.model");
const User = require("../models/User.model");

function getOrders(req, res) {
  res.render("customer/orders/allOrders");
}

async function addOrder(req, res, next) {
  console.log('HITTING ADD ORDERS')
  const cart = res.locals.cart;
  let userDoc;
  try {
    userDoc = await User.findById(res.locals.uid)
  } catch (error) {
    return next(error);
  }
  try {
    const order = new Order(cart, userDoc)
    order.save()
  } catch (error) {
    next(error)
    return
  }

  req.session.cart = null;

  res.redirect('/orders')
}

module.exports = {
  addOrder: addOrder,
  getOrders: getOrders
};
