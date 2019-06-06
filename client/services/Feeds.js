import * as events from '../constants/events.js';

class FeedsService {
  constructor(
    api,
    eventEmitter,
  ) {
    this.api = api;
    this.eventEmitter = eventEmitter;
  }

  async refreshFeeds() {
    await this.api.post('/api/feeds/refresh');
    this.eventEmitter.emit(events.FEEDS_REFRESHED);
  }

  getAllFeeds() {
    return this.api.get('/api/feeds');
  }

  async addFeed(url) {
    await this.api.post('/api/feeds', {
      body: {
        url,
      },
    });
    this.refreshFeeds();
  }

  deleteFeed(id) {
    return this.api.delete(`/api/feeds/${id}`);
  }
}

export default FeedsService;
