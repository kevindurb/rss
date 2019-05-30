class FeedsService {
  constructor(
    api,
  ) {
    this.api = api;
  }

  refreshFeeds() {
    return this.api.post('/api/feeds/refresh');
  }
}

export default FeedsService;
