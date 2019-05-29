const feedsGateway = require('../gateways/feeds');

module.exports = async (request) => {
  return feedsGateway.getFeeds();
};
