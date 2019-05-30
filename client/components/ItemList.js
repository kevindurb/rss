import ListGroup from '../elements/ListGroup.js';
import { formatDate } from '../utils/date.js';
import * as events from '../constants/events.js';

class ItemList extends HTMLElement {
  constructor() {
    super();
    this.items = [];
    this.itemService = window.container.get('itemsService');
    this.eventEmitter = window.container.get('eventEmitter');
  }

  connectedCallback() {
    if (this.isConnected) {
      this.loadItems();
      this.eventEmitter.addEventListener(events.FEEDS_REFRESHED, this.loadItems.bind(this));
    }
  }

  async loadItems() {
    this.items = await this.itemService.getAllItems();
    this.renderItems();
  }

  renderItem(item) {
    const a = document.createElement('a');
    a.href = item.link;
    a.target = '_blank';
    a.classList.add('list-group-item');
    a.classList.add('list-group-item-action');

    const top = document.createElement('div');
    top.classList.add('d-flex');
    top.classList.add('w-100');
    top.classList.add('justify-content-between');

    const h5 = document.createElement('h5');
    h5.innerHTML = item.title;

    const small = document.createElement('small');
    small.textContent = formatDate(item.publishedDate);

    const p = document.createElement('p');
    p.innerHTML = item.content;

    top.appendChild(h5);
    top.appendChild(small);
    a.appendChild(top);
    a.appendChild(p);
    return a;
  }

  renderItems() {
    const list = new ListGroup();
    const links = this.items.map(this.renderItem.bind(this));
    links.forEach(link => list.appendChild(link));
    this.innerHTML = '';
    this.appendChild(list);
  }
}

customElements.define('x-item-list', ItemList);

export default ItemList;