const database = require('./database');

module.exports = {
  async insertItems(items) {
    const db = await database.getConnection();
    await db.collection('items').insertMany(items)
  },
  async getItems() {
    const db = await database.getConnection();
    return await db.collection('items').find({}).toArray();
  }
};
