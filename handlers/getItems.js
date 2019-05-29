const itemsGateway = require('../gateways/items');

module.exports = async (request) => {
  return itemsGateway.getItems();
};
