import Container from './Container.js';
import Api from './services/api.js';
import ItemsService from './services/items.js';

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

    const list = document.createElement('x-item-list');
    this.rootEl.appendChild(list);
  }
}

export default App;
