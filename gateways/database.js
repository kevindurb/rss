const MongoClient = require('mongodb').MongoClient;

module.exports = {
  async getConnection() {
    const client = await MongoClient.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
    });
    const db = client.db();
    await this.setup(db);
    return db;
  },
  async setup(db) {
    await db.collection('feeds').createIndex({ url: 1 }, { unique: true });
    await db.collection('items').createIndex({ guid: 1 }, { unique: true });
  }
};
