const { ObjectId } = require('mongodb');
const database = require('./database');

module.exports = {
  async getFeeds() {
    const db = await database.getConnection();
    return await db.collection('feeds').find({}).toArray();
  },
  async createFeed(feedData) {
    const db = await database.getConnection();
    await db.collection('feeds').insertOne({
      url: feedData.url
    });
  },
  async deleteFeed(id) {
    console.log('delete', id);
    const db = await database.getConnection();
    await db.collection('feeds').deleteOne({ _id: ObjectId(id) });
  }
};
