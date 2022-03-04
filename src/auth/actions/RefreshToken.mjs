import InvalidArgumentException from '../../core/exceptions/InvalidArgumentException.mjs';
import makeToken from '../application_services/TokenBuilder.mjs';

class RefreshToken {
  #repository;

  constructor(repository) {
    this.#repository = repository;
  }

  async execute(refreshTokenString, user) {
    const token = await this.#repository.getByRefreshToken(refreshTokenString);

    if (token === null) {
      throw new InvalidArgumentException('Invalid refresh token');
    }

    if (token.isRefreshTokenExpired()) {
      throw new InvalidArgumentException('Refresh token expired');
    }

    const newToken = makeToken({ ...user });
    this.#repository.save(newToken);
    this.#repository.remove(token);

    return {
      authenticated: true,
      token: newToken.token,
      refresh_token: newToken.refreshToken,
    };
  }
}

export default RefreshToken;
