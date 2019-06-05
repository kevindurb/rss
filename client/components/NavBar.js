import Element from '../utils/Element.js';
import { makeButton } from '../elements/Button.js';
import { makeContainer } from '../elements/Container.js';

class NavBar extends Element {
  init(container) {
    this.feedsService = container.get('feedsService');
    this.refreshFeeds = this.refreshFeeds.bind(this);
  }

  mount() {
    this.classList.add('navbar');
    this.classList.add('navbar-light');
    this.classList.add('bg-light');
    this.classList.add('navbar-expand-lg');

    const container = makeContainer();
    const refreshButton = makeButton({
      primary: true,
      text: 'refresh',
    });

    this.listenTo('click', refreshButton, this.refreshFeeds);

    container.appendChild(refreshButton);
    this.appendChild(container);
  }

  async refreshFeeds() {
    await this.feedsService.refreshFeeds();
  }
}

customElements.define('x-nav-bar', NavBar);

export default NavBar;
