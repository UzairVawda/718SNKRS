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
	}
	
	getUserWithSameEmail () {
		return db.getDB().collection('users').findOne({email: this.email})
	}

	checkMatchingPassword (hassPass) {
		return bcrypt.compare(this.password, hassPass)
	}

	async exisitsAlready() {
		const existingUser = await this.getUserWithSameEmail()
		if (existingUser) {
			return true
		} 
		return false
	}

	async signup () {
		const hashPass = await bcrypt.hash(this.password, 12)
		await db.getDB().collection('users').insertOne({
			email: this.email,
			password: hashPass, // hash pass
			name: this.name,
			address: this.address
		})
	}
}

module.exports = User