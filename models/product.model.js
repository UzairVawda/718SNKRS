const mongodb = require("mongodb");
const db = require("../data/database");

class Product {
  constructor(productData) {
    this.title = productData.productTitle;
    this.summary = productData.productSummary;
    this.price = +productData.productPrice;
    this.description = productData.productDescription;
    this.imageName = productData.productImage;
    this.updateImageData();
    if (productData._id) {
      this.id = productData._id.toString();
    }
  }

  updateImageData() {
    this.imagePath = `productData/images/${this.imageName}`;
    this.imageUrl = `/products/assets/images/${this.imageName}`;
  }

  static async getAllProducts() {
    const products = await db.getDB().collection("products").find().toArray();

    return products.map(function (productDocument) {
      return new Product(productDocument);
    });
  }

  static async getOneProduct(id) {
    let prodId;
    try {
      prodId = new mongodb.ObjectId(id);
    } catch (error) {
      error.code = 404;
      throw error;
    }

    const product = await db
      .getDB()
      .collection("products")
      .findOne({ _id: prodId });
    if (!product) {
      const error = new Error("Could Not Find Product!");
      error.code = 404;
      throw error;
    }

    return new Product(product);
  }

  async saveProduct() {
    //same name as the front end name
    const product = {
      productTitle: this.title,
      productSummary: this.summary,
      productPrice: this.price,
      productDescription: this.description,
      productImage: this.imageName,
    };

    if (this.id) {
      const mongoObjID = new mongodb.ObjectId(this.id);
      if (!this.imageName) {
        delete product.productImage;
      }
      await db
        .getDB()
        .collection("products")
        .updateOne({ _id: mongoObjID }, { $set: product });
    } else {
      await db.getDB().collection("products").insertOne(product);
    }
  }
  
  async remove() {
    let mongoID;
    try {
      mongoID = new mongodb.ObjectId(this.id);
    } catch (error) {
      error.code = 404;
      throw error;
    }
    await db.getDB().collection("products").deleteOne({ _id: mongoID });
  }

  replaceImage(newImage) {
    this.imageName = newImage;
    this.updateImageData();
  }

  static async findMultiple(ids) {
    const productIds = ids.map(function (id) {
      return new mongodb.ObjectId(id);
    });

    const products = await db
      .getDB()
      .collection("products")
      .find({ _id: { $in: productIds } })
      .toArray();

    return products.map(function (productDocument) {
      return new Product(productDocument);
    });
  }
}

module.exports = Product;
