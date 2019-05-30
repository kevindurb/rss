class ItemList extends HTMLElement {
  constructor() {
    super();
    this.items = [];
    this.itemService = window.container.get('itemsService');
  }

  connectedCallback() {
    if (this.isConnected) {
      this.loadItems();
    }
  }

  async loadItems() {
    this.items = await this.itemService.getAllItems();
    this.renderItems();
  }

  renderItem(item) {
    const el = document.createElement('div');
    el.textContent = item.title;
    this.appendChild(el);
  }

  renderItems() {
    this.items.forEach(this.renderItem.bind(this));
  }
}

customElements.define('x-item-list', ItemList);
