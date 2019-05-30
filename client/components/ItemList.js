import ListGroup from '../elements/ListGroup.js';

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
    const a = document.createElement('a');
    a.textContent = item.title;
    a.href = item.link;
    a.target = '_blank';
    a.classList.add('list-group-item');
    a.classList.add('list-group-item-action');
    return a;
  }

  renderItems() {
    const list = new ListGroup();
    const links = this.items.map(this.renderItem.bind(this));
    links.forEach(link => list.appendChild(link));
    this.appendChild(list);
  }
}

customElements.define('x-item-list', ItemList);

export default ItemList;
