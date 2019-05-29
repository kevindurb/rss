const feedsGateway = require('../gateways/feeds');

module.exports = async (request) => {
  return feedsGateway.createFeed(request.body);
};
