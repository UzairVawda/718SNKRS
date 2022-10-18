const mongodb = require("mongodb");

const MongoClient = mongodb.MongoClient;

async function connectToDB() {
  const client = await MongoClient.connect("mongodb://localhost:27017");
  database = client.db("718SNKR");
}

function getDB() {
  if (!database) {
    throw new Error("FAILED TO CONNECT TO DB");
  }
  return database;
}

module.exports = {
  connectToDB: connectToDB,
  getDB: getDB,
};
