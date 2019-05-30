import Container from './Container.js';
import Api from './services/api.js';
import ItemsService from './services/items.js';
import FeedsService from './services/Feeds.js';
import AppComponent from './components/App.js';

class App {
  constructor() {
    this.container = new Container();
    this.rootEl = document.getElementById('root');

    window.container = this.container;
  }

  boot() {
    this.container.add('api', () => (
      new Api()
    ));

    this.container.add('itemsService', (c) => (
      new ItemsService(
        c.get('api')
      )
    ));

    this.container.add('feedsService', (c) => (
      new FeedsService(
        c.get('api')
      )
    ));

    this.rootEl.appendChild(new AppComponent());
  }
}

export default App;
