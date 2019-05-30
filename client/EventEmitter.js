class EventEmitter {
  constructor() {
    this.listeners = {};
  }

  addEventListener(event, callback) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event].push(callback);
  }

  emit(event, ...args) {
    if (this.listeners[event]) {
      this.listeners[event].forEach((callback) => (
        callback(...args)
      ));
    }
  }
}

export default EventEmitter;
