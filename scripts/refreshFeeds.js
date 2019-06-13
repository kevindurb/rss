const path = require('path');
require('dotenv').config({
  path: path.join(__dirname, '../.env')
});

const refreshFeedsHandler = require('../handlers/refreshFeeds');

refreshFeedsHandler()
  .then(() => process.exit());
