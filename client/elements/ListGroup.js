class ListGroup extends HTMLElement {
  connectedCallback() {
    if (this.isConnected) {
      this.classList.add('list-group');
    }
  }
}

customElements.define('x-list-group', ListGroup);

export default ListGroup;
