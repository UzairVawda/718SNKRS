const Order = require("../models/order.model");
const User = require("../models/User.model");
const stripe = require('stripe')('sk_test_51LzpfMBVSj0YVfxBbjeG3Tti4M2PMTolG8E9XgreklGgXb2jPBXClBZaXcrlkMi97dne1uhgnoip7581BD0K542600etU2V4Gy')

async function getOrders(req, res) {
  try {
    const orders = await Order.findAllOrderForUser(res.locals.uid);
    res.render("customer/orders/allOrders", {
      userOrders: orders,
    });
  } catch (error) {
    next(error);
  }
}

async function addOrder(req, res, next) {
  const cart = res.locals.cart;
  console.log(cart.items)
  let userDoc;
  try {
    userDoc = await User.findById(res.locals.uid);
  } catch (error) {
    return next(error);
  }
  try {
    const order = new Order(cart, userDoc);
    await order.save();
  } catch (error) {
    next(error);
    return;
  }

  req.session.cart = null;

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: cart.items.map(function(item) {
      return  {
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.product.title
          },
          unit_amount: +item.product.price.toFixed(2) * 100
        },
        quantity: item.quantity,
      }
    }),
    mode: 'payment',
    success_url: 'http://localhost:7180/orders/success',
    cancel_url: 'http://localhost:7180/orders/failure',
  });

  res.redirect(303, session.url);
}

async function getSuccess(req, res) {
  res.render("customer/orders/success");
}

async function getFailure(req, res) {
  res.render("customer/orders/failure");
}

module.exports = {
  addOrder: addOrder,
  getOrders: getOrders,
  getSuccess: getSuccess,
  getFailure: getFailure
};
