import Element from '../utils/Element.js';
import ManageFeedsModal from './ManageFeedsModal.js';
import { makeButton } from '../elements/Button.js';
import { makeIcon } from '../elements/Icon.js';
import { makeContainer } from '../elements/Container.js';

class NavBar extends Element {
  init(container) {
    this.feedsService = container.get('feedsService');
    this.refreshFeeds = this.refreshFeeds.bind(this);
    this.scrollToTop = this.scrollToTop.bind(this);
  }

  mount() {
    this.classList.add('navbar');
    this.classList.add('navbar-light');
    this.classList.add('bg-light');
    this.classList.add('navbar-expand-lg');
    this.classList.add('fixed-top');

    const manageFeedsModal = new ManageFeedsModal();
    const container = makeContainer();
    this.$refreshButton = makeButton({ primary: true });
    this.$scrollToTopButton = makeButton({ primary: true });

    this.$refreshButton.appendChild(
      makeIcon({ iconName: 'sync' })
    );

    this.$scrollToTopButton.appendChild(
      makeIcon({ iconName: 'arrow-up' })
    );

    this.listenTo('click', this.$refreshButton, this.refreshFeeds);
    this.listenTo('click', this.$scrollToTopButton, this.scrollToTop);

    container.appendChild(manageFeedsModal);
    container.appendChild(this.$refreshButton);
    container.appendChild(this.$scrollToTopButton);
    this.appendChild(container);
  }

  async refreshFeeds() {
    this.$refreshButton.setAttribute('disabled', true);
    this.$refreshButton.querySelector('i').classList.add('fa-spin');
    await this.feedsService.refreshFeeds();
    this.$refreshButton.removeAttribute('disabled');
    this.$refreshButton.querySelector('i').classList.remove('fa-spin');
  }

  scrollToTop() {
    window.scrollTo(0, 0);
  }
}

customElements.define('x-nav-bar', NavBar);

export default NavBar;
