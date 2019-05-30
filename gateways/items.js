const database = require('./database');

module.exports = {
  async insertItems(items) {
    const db = await database.getConnection();
    const collection = db.collection('items');

    for (let item of items) {
      try {
        await collection.updateOne(
          { guid: item.guid },
          { $set: item },
          { upsert: true },
        );
      } catch (e) {
        console.log(e.message);
      }
    }
  },
  async getItems() {
    const db = await database.getConnection();
    return await db.collection('items')
      .find({})
      .sort({ publishedDate: -1 })
      .toArray();
  }
};
