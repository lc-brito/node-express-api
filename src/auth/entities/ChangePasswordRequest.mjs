class ChangePasswordRequest {
  #token;

  #email;

  #expireAt;

  constructor(email) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    this.#email = email;
    this.#token = this.#makeRandomToken(20);
    this.#expireAt = tomorrow;
  }

  #makeRandomToken(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;

    for (let i = 0; i < length; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * charactersLength),
      );
    }

    return result;
  }

  set #setToken(token) {
    this.#token = token;
  }

  set #setExpireAt(expireAt) {
    this.#expireAt = expireAt;
  }

  get email() {
    return this.#email;
  }

  get token() {
    return this.#token;
  }

  isExpired() {
    const now = new Date();

    return now > this.#expireAt;
  }

  isActive() {
    return !this.isExpired();
  }

  static from(email, token, expireAt) {
    const request = new ChangePasswordRequest(email);

    request.#setToken = token;
    request.#setExpireAt = expireAt;

    return request;
  }

  asObject() {
    return {
      id: this.#token,
      token: this.#token,
      email: this.#email,
      expire_at: this.#expireAt.toISOString(),
    };
  }
}

export default ChangePasswordRequest;
