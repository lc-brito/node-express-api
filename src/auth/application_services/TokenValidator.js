import TokenRepository from '../repositories/TokenRepository.mjs';
import RepositoryImpl from '../../core/repository/index.mjs';

class TokenValidator {
  #repository;

  constructor(repository) {
    this.#repository = repository;
  }

  async isTokenExpired(tokenString) {
    const token = await this.#repository.getByToken(tokenString);

    if (token === null) {
      return true;
    }

    return token.isTokenExpired();
  }

  async isRefreshTokenExpired(refreshTokenString) {
    const token = await this.#repository.getByToken(refreshTokenString);

    if (token === null) {
      return true;
    }

    return token.isRefreshTokenExpired();
  }
}

export default new TokenValidator(
  new TokenRepository(RepositoryImpl),
);
