function createUserSession(req, user, action) {
	console.log('createUserSession: ' + user)
	req.session.uid = user._id.toString();
	req.session.save(action)
}

function destroyUserSession(req) {
	req.session.uid = null;
}

module.exports = {
	createUserSession: createUserSession,
	destroyUserSession: destroyUserSession
}
