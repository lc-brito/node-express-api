class SMS {
  #to;

  #message;

  constructor(to, message) {
    this.#to = to;
    this.#message = message;
  }

  get to() {
    return this.#to;
  }

  get message() {
    return this.#message;
  }
}

export default SMS;
