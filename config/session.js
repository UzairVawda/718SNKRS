const expressSession = require('express-session');
const mongodbStore = require('connect-mongodb-session');

function createSessionStore() {
	const MongoDBStore = mongodbStore(expressSession);
	const store = new MongoDBStore({
		uri: 'mongodb://localhost:27017',
		databaseName: '718SNKR',
		collection: 'sessions'
	})

	return store;
}

function createSessionConfig() {
	return {
		secret: 'switch',
		resave: false,
		saveUninitialized: false,
		store: createSessionStore(),
		cookie: {
			maxAge: 2*24*60*60*1000,
			sameSite: 'lax'
		}
	}
}

module.exports = createSessionConfig;