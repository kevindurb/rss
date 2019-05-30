import * as itemService from '/services/items.js';

class ItemList extends HTMLElement {
  constructor() {
    super();
    this.items = [];
  }

  connectedCallback() {
    if (this.isConnected) {
      this.loadItems();
    }
  }

  async loadItems() {
    this.items = await itemService.getItems();
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
