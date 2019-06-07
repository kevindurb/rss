const database = require('./database');

module.exports = {
  async insertItems(items) {
    const db = await database.getConnection();
    const collection = db.collection('items');

    for (let item of items) {
      try {
        const {
          publishedDate,
          ...restItem
        } = item;

        await collection.updateOne(
          { guid: item.guid },
          { $set: restItem, $setOnInsert: { publishedDate } },
          { upsert: true },
        );
      } catch (e) {
        console.log(e.message);
      }
    }
  },
  async getItems(limit = 100, offset = 0) {
    const db = await database.getConnection();
    return await db.collection('items')
      .find({})
      .sort({ publishedDate: -1 })
      .skip(offset)
      .limit(limit)
      .toArray();
  }
};
