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
}

export default ItemsService;
