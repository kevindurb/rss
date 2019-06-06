class ElementBuilder {
  constructor(tagOrClass = 'div') {
    if (typeof tagOrClass === 'string') {
      this.element = document.createElement(tagOrClass);
    } else {
      this.element = new tagOrClass();
    }
  }

  classes(classes) {
    classes.forEach(className => this.class(className));
    return this;
  }

  class(className) {
    this.element.classList.add(className);
    return this;
  }

  attr(key, value) {
    this.element.setAttribute(key, value);
    return this;
  }

  data(key, value) {
    this.element.dataset[key] = value;
    return this;
  }

  id(id) {
    this.attr('id', id);
    return this;
  }

  children(children) {
    children.forEach(child => this.child(child));
    return this;
  }

  child(childOrText) {
    let child = childOrText;
    if (typeof child === 'string') {
      child = document.createElement('span');
      child.textContent = childOrText;
    }

    if (child instanceof ElementBuilder) {
      this.element.appendChild(child.getElement());
    } else {
      this.element.appendChild(child);
    }
    return this;
  }

  getElement() {
    return this.element;
  }

  appendTo(parent) {
    parent.appendChild(this.getElement());
    return this;
  }
}

export const build = (tagOrClass) => new ElementBuilder(tagOrClass);
