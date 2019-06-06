import Element from '../utils/Element.js';
import { makeListGroup } from '../elements/ListGroup.js';
import { makeButton } from '../elements/Button.js';
import { makeModal, linkModalAndButton } from '../elements/Modal.js';

class ManageFeedsModal extends Element {
  init(container) {
    this.feedsService = container.get('feedsService');
    this.renderFeeds = this.renderFeeds.bind(this);
    this.renderFeed = this.renderFeed.bind(this);
    this.addFeed = this.addFeed.bind(this);
  }

  mount() {
    const manageFeedsButton = makeButton({
      text: 'Manage Feeds',
    });
    this.$modal = makeModal({
      id: 'ManageFeedsModal',
      headerText: 'Manage Feeds',
    });

    linkModalAndButton(this.$modal, manageFeedsButton);

    this.appendChild(manageFeedsButton);
    this.appendChild(this.$modal);

    this.loadFeeds();
  }

  loadFeeds() {
    this.feedsService.getAllFeeds().then(this.renderFeeds);
  }

  async addFeed() {
    const url = this.$addFeedInput.value;
    await this.feedsService.addFeed(url);
    this.loadFeeds();
  }

  deleteFeed(id) {
    return async () => {
      await this.feedsService.deleteFeed(id);
      this.loadFeeds();
    }
  }

  renderFeed(feed) {
    const div = document.createElement('div');
    const textContainer = document.createElement('div');
    const deleteButton = makeButton({
      text: 'delete',
    });

    div.classList.add('list-group-item');
    div.classList.add('justify-content-between');
    div.classList.add('align-items-center');
    div.classList.add('d-flex');
    textContainer.textContent = feed.url;

    this.listenTo('click', deleteButton, this.deleteFeed(feed.id))

    div.appendChild(textContainer);
    div.appendChild(deleteButton);
    return div;
  }

  renderAddFeed() {
    const inputGroup = document.createElement('div');
    const inputGroupAppend = document.createElement('div');
    this.$addFeedInput = document.createElement('input');
    const button = makeButton({
      primary: true,
      text: 'Add',
    });

    this.$addFeedInput.type = 'url';
    this.$addFeedInput.classList.add('form-control');
    inputGroup.classList.add('input-group');
    inputGroupAppend.classList.add('input-group-append');

    this.listenTo('click', button, this.addFeed);

    inputGroupAppend.appendChild(button);
    inputGroup.appendChild(this.$addFeedInput);
    inputGroup.appendChild(inputGroupAppend);
    return inputGroup;
  }

  renderFeeds(feeds) {
    const list = makeListGroup();
    const listItems = feeds.map(this.renderFeed);
    listItems.forEach(item => list.appendChild(item));
    const $modalBody = this.$modal.querySelector('.modal-body');
    $modalBody.innerHTML = '';
    $modalBody.appendChild(list);
    $modalBody.appendChild(this.renderAddFeed());
  }
}

customElements.define('x-manage-feeds-modal', ManageFeedsModal);

export default ManageFeedsModal;
