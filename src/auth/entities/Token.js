class Token {
  #token;

  #refreshToken;

  #tokenExpireAt;

  #refreshTokenExpireAt;

  constructor(token, refreshToken, tokenExpireAt, refreshTokenExpireAt) {
    this.#token = token;
    this.#refreshToken = refreshToken;
    this.#tokenExpireAt = tokenExpireAt;
    this.#refreshTokenExpireAt = refreshTokenExpireAt;
  }

  get id() {
    return this.#token;
  }

  get token() {
    return this.#token;
  }

  get refreshToken() {
    return this.#refreshToken;
  }

  isTokenExpired() {
    return new Date() > this.#tokenExpireAt;
  }

  isRefreshTokenExpired() {
    return new Date() > this.#refreshTokenExpireAt;
  }

  asObject() {
    return {
      id: this.#token,
      token: this.#token,
      refresh_token: this.#refreshToken,
      token_expire_at: this.#tokenExpireAt,
      refresh_token_expire_at: this.#refreshTokenExpireAt,
    };
  }
}

export default Token;
