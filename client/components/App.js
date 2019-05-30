import ItemList from './ItemList.js';
import Button from '../elements/Button.js';

class App extends HTMLElement {
  constructor() {
    super();
    this.feedsService = window.container.get('feedsService');
  }

  connectedCallback() {
    if (this.isConnected) {
      const refreshButton = new Button();
      refreshButton.textContent = 'refresh';
      refreshButton.addEventListener('click', this.refreshFeeds.bind(this));

      this.appendChild(refreshButton);
      this.appendChild(new ItemList());
    }
  }

  async refreshFeeds() {
    await this.feedsService.refreshFeeds();
  }
}

customElements.define('x-app', App);

export default App;
