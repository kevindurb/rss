const feedsGateway = require('../gateways/feeds');
const rssFinder = require('rss-finder');

module.exports = async (request) => {
  const webUrl = request.body.url;
  const siteData = await rssFinder(webUrl);

  await Promise.all(
    siteData.feedUrls.map(({ url }) =>
      feedsGateway.createFeed({ url })
    )
  );
};
