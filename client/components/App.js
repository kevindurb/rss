import ItemList from './ItemList.js';
import NavBar from './NavBar.js';
import { makeContainer } from '../elements/Container.js';
import Element from '../utils/Element.js';

class App extends Element {
  mount() {
    const container = makeContainer();
    const itemList = new ItemList();
    const navBar = new NavBar();

    container.classList.add('mt-5');
    container.classList.add('pt-3');
    container.appendChild(itemList);

    this.appendChild(new NavBar());
    this.appendChild(container);
  }
}

customElements.define('x-app', App);

export default App;
