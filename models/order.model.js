const db = require("../data/database");

class Order {
  constructor(cart, userData, status = "pending", date, orderId) {
    this.productData = cart;
    this.userData = userData;
    this.status = status;
    this.date = new Date(date);
    if (this.date) {
      this.formattedDate = this.date.toLocaleString("en-us", {
        weekday: "short",
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    }
    this.orderId = orderId;
  }
  save(ß) {
    if (this.orderId) {
    } else {
      const newOrder = {
				userData: this.userData,
				productData: this.productData,
				date: new Date()
			}
			return db.getDB().collection('orders').insertOne(newOrder)
		};
	}
}

module.exports = Order;
