const bcrypt = require('bcryptjs')
const db = require("../data/database");
class User {
	constructor (email, password, fullName, street, postal, city) {
		this.email = email
		this.password = password
		this.name = fullName
		this.address = {
			street:street,
			postal: postal,
			city: city
		}
		console.log('from construct: ' + this.email, this.password)
	}
	
	getUserWithSameEmail () {
		return db.getDB().collection('users').findOne({email: this.email})
	}

	checkMatchingPassword (hassPass) {
		console.log('hasspass: ' + hassPass)
		console.log('this.password: ' + this.password)
		return bcrypt.compare(this.password, hassPass)
	}

	async signup () {
		const hashPass = await bcrypt.hash(this.password, 12)
		await db.getDB().collection('users').insertOne({
			email: this.email,
			password: hashPass, // hash pass
			name: this.name,
			address: this.address
		})
		// const exisitng = await db.getDB('users').findOne({emai: })
	}
}

module.exports = User