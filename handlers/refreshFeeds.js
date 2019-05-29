const RssParser = require('rss-parser');
const rssFinder = require('rss-finder');
const feedsGateway = require('../gateways/feeds');
const itemsGateway = require('../gateways/items');

const rssParser = new RssParser();

module.exports = async (request) => {
  const feeds = await feedsGateway.getFeeds();

  const urls = await Promise.all(
    feeds.map((feed) => rssFinder(feed.url)),
  );

  const feedDatas = await Promise.all(
    urls.map((url) => (
      rssParser.parseURL(url.feedUrls[0].url)
      .catch(() => (null))
    )),
  );

  const items = feedDatas
    .filter(x => x)
    .reduce((acc, feed) => {
      return [
        ...acc,
        ...feed.items,
      ];
    }, []);

  itemsGateway.insertItems(items.map(item => ({
    _id: item.id || item.guid || item.link,
    link: item.link,
    publishedDate: item.pubDate,
    author: item.author || item.creator,
    content: item.content,
    title: item.title,
  })))
};
