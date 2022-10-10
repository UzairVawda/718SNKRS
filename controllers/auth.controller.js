function getSignup(req, res) {
	res.send('getSignup')
}

function getLogin(req, res) {
	res.send('getLogin')
}

module.exports = {
	getSignup: getSignup,
	getLogin: getLogin
}