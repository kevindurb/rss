const RssParser = require('rss-parser');
const feedsGateway = require('../gateways/feeds');
const itemsGateway = require('../gateways/items');

const rssParser = new RssParser();

module.exports = async () => {
  const feeds = await feedsGateway.getFeeds();

  const feedDatas = await Promise.all(
    feeds.map((feed) => (
      rssParser.parseURL(feed.url)
      .catch(() => (null))
    )),
  );

  const now = new Date();

  const items = feedDatas
    .filter(x => x)
    .reduce((acc, feed) => {
      return [
        ...acc,
        ...feed.items,
      ];
    }, [])
    .map(item => ({
      guid: item.id || item.guid || item.link,
      link: item.link,
      publishedDate: new Date(item.pubDate || now),
      author: item.author || item.creator,
      content: item.content,
      title: item.title,
    }));


  await itemsGateway.insertItems(items);
};
