class AbstractListener {
  #event;

  constructor(eventName) {
    if (this.constructor.name === 'AbstractListener') {
      throw new Error('Abstract class "AbstractListener" cannot be instantiated');
    }
    this.#event = eventName;
  }

  static from() {
    return new this();
  }

  get event() {
    return this.#event;
  }

  notify(payload) {
    throw new Error(`Must implement method notify on event ${this.#event}.`);
  }

  isEqual(listener) {
    return listener.event === this.#event;
  }
}

export default AbstractListener;
