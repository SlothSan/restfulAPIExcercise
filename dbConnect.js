const MongoClient = require('mongodb').MongoClient;

async function createDbConnection(url, dbName, collectionName) {
    const connection = await MongoClient.connect(url);
    return connection.db(dbName).collection(collectionName);
}

module.exports = createDbConnection;