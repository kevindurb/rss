class ItemsService {
  constructor(
    api,
  ) {
    this.api = api;
  }

  getAllItems() {
    return this.api.get('/api/items');
  }
}

export default ItemsService;
