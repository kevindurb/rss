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
}

export default FeedsService;
