const { MongoClient } = require('mongodb');
const settings = require('./settings');
const mongoConfig = settings.mongoConfig;

let _connection = undefined;
let _db = undefined;

module.exports = {
  dbConnection: async () => {
    if (!_connection) {
      // Use environment variable if provided (e.g., Render)
      const mongoUrl = process.env.MONGO_URI || mongoConfig.serverUrl;
      const dbName = mongoConfig.database;

      console.log("Connecting to MongoDB at:", mongoUrl);

      _connection = await MongoClient.connect(mongoUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      _db = await _connection.db(dbName);
      console.log("✅ Connected to database:", dbName);
    }

    return _db;
  },
  closeConnection: () => {
    if (_connection) _connection.close();
  },
};
