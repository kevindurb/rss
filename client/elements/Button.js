class Button extends HTMLButtonElement {
  connectedCallback() {
    if (this.isConnected) {
      this.classList.add('btn');
      this.classList.add('btn-primary');
    }
  }
}

customElements.define('x-button', Button, { extends: 'button' });

export default Button;
