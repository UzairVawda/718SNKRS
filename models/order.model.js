const mongodb = require("mongodb");
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

  static transfromOrderDoc(orderDoc) {
    return new Order(
      orderDoc.productData,
      orderDoc.userData,
      orderDoc.status,
      orderDoc.date,
      orderDoc._id
    );
  }

  static transformOrderDocuments(orderDocs) {
    return orderDocs.map(this.transfromOrderDoc);
  }

  static async findAllOrders() {
    const orders = await db.getDB().collection("orders").find({}).toArray();
    return this.transformOrderDocuments(orders);
  }

  static async findAllOrderForUser(userId) {
    const uid = new mongodb.ObjectId(userId);
    const order = await db
      .getDB()
      .collection("orders")
      .find({ "userData._id": uid })
      .sort({ _id: -1 })
      .toArray();

    return this.transformOrderDocuments(order);
  }

  static async findByOrderId(orderID) {
    const mongoOrderID = new mongodb.ObjectId(orderID);
    const order = await db
      .getDB()
      .collection("orders")
      .findOne({ "_id": mongoOrderID })

    return this.transfromOrderDoc(order);
  }

  save() {
    if (this.orderId) {
      return db
        .getDB()
        .collection("orders")
        .updateOne(
          { _id: this.orderId },
          {
            $set: {
              status: this.status,
            },
          }
        );
    } else {
      const newOrder = {
        userData: this.userData,
        productData: this.productData,
        date: new Date(),
        status: this.status,
      };
      return db.getDB().collection("orders").insertOne(newOrder);
    }
  }
}

module.exports = Order;
