import Token from '../entities/Token.js';

class TokenRepository {
  #storage;

  #collection = 'tokens';

  constructor(storageImpl) {
    this.#storage = storageImpl;
    this.#storage.createCollection(this.#collection);
  }

  async save(token) {
    return this
      .#storage
      .save(this.#collection, token.asObject());
  }

  async remove(token) {
    return this
      .#storage
      .remove(this.#collection, token.id);
  }

  async getByToken(token) {
    const tokenRaw = await this
      .#storage
      .get(this.#collection, token);

    if (!tokenRaw) {
      return null;
    }

    return new Token(
      tokenRaw.token,
      tokenRaw.refresh_token,
      new Date(tokenRaw.token_expire_at),
      new Date(tokenRaw.refresh_token_expire_at),
    );
  }

  async getByRefreshToken(refreshToken) {
    const tokens = await this.getAll();

    return tokens
      .filter((token) => token.refreshToken === refreshToken)
      .shift();
  }

  async getAll() {
    const tokens = await this
      .#storage
      .getAll(this.#collection);

    return tokens.map((token) => new Token(
      token.token,
      token.refresh_token,
      new Date(token.token_expire_at),
      new Date(token.refresh_token_expire_at),
    ));
  }
}

export default TokenRepository;
