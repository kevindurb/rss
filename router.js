const Router = require('express').Router;
const promisify = require('./promisify');

const router = new Router();

router.get('/feeds', promisify(
  require('./handlers/getFeeds'),
  require('./serializers/feed')
));

router.post('/feeds', promisify(
  require('./handlers/createFeed')
));

router.post('/feeds/refresh', promisify(
  require('./handlers/refreshFeeds')
));

router.get('/items', promisify(
  require('./handlers/getItems')
));

module.exports = router;
