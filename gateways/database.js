const MongoClient = require('mongodb').MongoClient;

module.exports = {
  async getConnection() {
    const client = await MongoClient.connect(process.env.MONGO_DB);
    const db = client.db('feed-reader');
    await this.setup(db);
    return db;
  },
  async setup(db) {
    await db.collection('feeds').createIndex({ url: 1 }, { unique: true });
    await db.collection('items').createIndex({ id: 1 }, { unique: true });
  }
};
