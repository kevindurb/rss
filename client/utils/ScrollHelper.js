import EventEmitter from '../EventEmitter.js';

class ScrollHelper extends EventEmitter {
  constructor($el) {
    this.$el = $el;
  }
}
