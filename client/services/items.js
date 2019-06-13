class ItemsService {
  constructor(
    api,
    eventEmitter,
  ) {
    this.api = api;
    this.eventEmitter = eventEmitter;
  }

  getAllItems() {
    return this.api.get('/api/items');
  }

  markRead(id) {
    return this.api.post(`/api/items/${encodeURIComponent(id)}/mark_read`);
  }
}

export default ItemsService;
