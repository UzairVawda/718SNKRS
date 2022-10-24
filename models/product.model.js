const db = require("../data/database");

class Product {
	constructor (productData) {
		this.title = productData.productTitle
		this.summary = productData.productSummary
		this.price = +productData.productPrice
		this.description = productData.productDescription
		this.imageName = productData.productImage
		this.imagePath = `productData/images/${productData.productImage}`
		this.imageUrl = `/products/assets/images/${productData.productImage}`
		if (productData._id) {
			this.id = productData._id.toString()
		}
		// console.log(productData)
	}


	async saveProduct () {
		//same name as the front end name
		const product = {
			productTitle: this.title,
			productSummary: this.summary,
			productPrice: this.price,
			productDescription: this.description,
			productImage: this.imageName
		}
		await db.getDB().collection('products').insertOne(product)
	}

	static async getAllProducts() {
    const products = await db.getDB().collection('products').find().toArray();

    return products.map(function (productDocument) {
      return new Product(productDocument);
    });
  }
}

module.exports = Product