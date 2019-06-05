class Element extends HTMLElement {
  constructor() {
    super();
    this.init(window.container);
  }

  connectedCallback() {
    if (this.isConnected) {
      this.mount();
    }
  }

  init() {}

  mount() {}

  listenTo(event, element, callback) {
    element.addEventListener(event, callback);
  }
}

export default Element;
