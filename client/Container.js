class Container {
  constructor() {
    this.instances = {};
    this.factories = {};
  }

  add(identifier, factory) {
    this.factories[identifier] = factory;
  }

  get(identifier) {
    if (!this.instances[identifier]) {
      if (!this.factories[identifier]) {
        throw new Error(`factory not found for identifier ${identifier}`);
      }
      this.instances[identifier] = this.factories[identifier](this);
    }
    return this.instances[identifier];
  }
}

export default Container;
