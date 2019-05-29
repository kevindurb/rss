require('dotenv').config();
const rssFinder = require('rss-finder');
const RssParser = require('rss-parser');
const fs = require('fs').promises;
const express = require('express');

const rssParser = new RssParser();

const FEEDS_PATH = './feeds.txt';

const run = async () => {
  const feedsHandle = await fs.open(FEEDS_PATH);
  const contents = await feedsHandle.readFile({ encoding: 'utf8' });
  const websiteUrls = contents.split('\n').filter((line) => {
    return line && !line.startsWith('#');
  });

  const urls = await Promise.all(
    websiteUrls.map(rssFinder),
  );

  const feeds = await Promise.all(
    urls.map((url) => (
      rssParser.parseURL(url.feedUrls[0].url)
      .catch(() => (null))
    )),
  );

  const items = feeds
    .filter(x => x)
    .reduce((acc, feed) => {
      return [
        ...acc,
        ...feed.items,
      ];
    }, []);

  console.log(items);
};

const app = express();

app.use(require('body-parser').json());

app.use(require('./router'));

app.listen(8080);
