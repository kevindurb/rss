export default (tagOrClass = 'div', attributes = {}, children = []) => {
  let element;
  if (typeof tagOrClass === 'string') {
    element = document.createElement(tagOrClass);
  } else {
    element = new tagOrClass();
  }

  if (attributes.classList) {
    attributes.classList.forEach((className) => {
      element.classList.add(className);
    });
  }

  if (attributes.data) {
    Object.keys(attributes.data).forEach((key) => {
      element.dataset[key] = attributes.data[key];
    });
  }

  if (attributes.textContent) {
    element.textContent = attributes.textContent;
  }

  if (attributes.id) {
    element.setAttribute('id', attributes.id);
  }

  if (typeof children === 'string') {
    element.textContent = children;
  } else if (Array.isArray(children)) {
    children.forEach((child) => {
      element.appendChild(child);
    });
  }

  return element;
};
