class Email {
  #to;

  #subject;

  #message;

  constructor(to, subject, message) {
    this.#to = to;
    this.#subject = subject;
    this.#message = message;
  }

  get to() {
    return this.#to;
  }

  get subject() {
    return this.#subject;
  }

  get message() {
    return this.#message;
  }
}

export default Email;
