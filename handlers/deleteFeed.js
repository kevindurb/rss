const feedsGateway = require('../gateways/feeds');

module.exports = async (request) => {
  return feedsGateway.deleteFeed(request.params.id);
};
