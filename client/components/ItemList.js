import { makeListGroup } from '../elements/ListGroup.js';
import { formatDate } from '../utils/date.js';
import * as events from '../constants/events.js';
import Element from '../utils/Element.js';
import { build } from '../utils/fluent.js';

class ItemList extends Element {
  init(container) {
    this.items = [];
    this.itemService = container.get('itemsService');
    this.eventEmitter = container.get('eventEmitter');
  }

  mount() {
    this.loadItems();
    this.eventEmitter.addEventListener(events.FEEDS_REFRESHED, this.loadItems.bind(this));
  }

  async loadItems() {
    this.items = await this.itemService.getAllItems();
    this.renderItems();
  }

  renderItem(item) {
    return (
      build('a')
      .attr('href', item.link)
      .classes(['list-group-item', 'list-group-item-action'])
      .children([
        build('div')
        .classes(['d-flex', 'w-100', 'justify-content-between'])
        .children([
          build('h5')
          .innerHTML(item.title),
          build('small')
          .child(formatDate(item.publishedDate)),
        ]),
        build('p')
        .innerHTML(item.content)
      ])
      .getElement()
    );
  }

  renderItems() {
    const list = makeListGroup();
    const links = this.items.map(this.renderItem.bind(this));
    links.forEach(link => list.appendChild(link));
    this.innerHTML = '';
    this.appendChild(list);
  }
}

customElements.define('x-item-list', ItemList);

export default ItemList;
