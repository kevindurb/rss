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
    this.loadItems = this.loadItems.bind(this);
    this.updateRead = this.updateRead.bind(this);
  }

  mount() {
    this.loadItems();
    this.listenTo(events.FEEDS_REFRESHED, this.eventEmitter, this.loadItems)
    this.listenTo('scroll', document, this.updateRead);
  }

  updateRead() {
    const bottom = window.innerHeight;
    const anchors = Array.from(this.querySelectorAll('a.list-group-item'));
    const unreadAnchorsAboveBottom = anchors.filter((anchor) => {
      const rect = anchor.getBoundingClientRect();
      return rect.bottom < bottom && anchor.dataset.read === 'false';
    });

    unreadAnchorsAboveBottom.forEach((anchor) => {
      this.itemService.markRead(anchor.dataset.id);
      anchor.dataset.read = true;
    });
  }

  async loadItems() {
    this.items = await this.itemService.getAllItems();
    this.renderItems();
    this.scrollToTop();
    this.updateRead();
  }

  scrollToTop() {
    window.scrollTo(0, 0);
  }

  renderItem(item) {
    return (
      build('a')
      .data('id', item.guid)
      .data('read', item.read || false)
      .attr('target', '_blank')
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
