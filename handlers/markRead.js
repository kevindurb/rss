const itemsGateway = require('../gateways/items');

module.exports = async (request) => {
  return itemsGateway.markRead(request.params.id);
};
