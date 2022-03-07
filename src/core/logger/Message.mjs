class Message {
  #context;

  #action;

  #message;

  #level;

  constructor(context, action, message, level) {
    this.#context = context;
    this.#action = action;
    this.#message = message;
    this.#level = level;
  }

  get context() {
    return this.#context;
  }

  get action() {
    return this.#action;
  }

  get message() {
    return this.#message;
  }

  get level() {
    return this.#level;
  }
}

export default Message;
