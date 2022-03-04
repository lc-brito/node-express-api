class ChangePasswordRequestedEvent {
  #name;

  #payload;

  constructor(changePasswordRequest) {
    this.#name = 'CHANGE_PASSWORD_REQUEST_CREATED';
    this.#payload = changePasswordRequest;
  }

  static from(changePasswordRequestEvent) {
    return new this(changePasswordRequestEvent);
  }

  get name() {
    return this.#name;
  }

  get payload() {
    return this.#payload;
  }
}

export default ChangePasswordRequestedEvent;
