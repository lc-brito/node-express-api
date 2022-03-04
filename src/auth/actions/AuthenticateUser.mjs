import makeToken from '../application_services/TokenBuilder.mjs';

class AuthenticateUser {
  #tokenRepository;

  #authRepository;

  constructor(tokenRepository, authRepository) {
    this.#tokenRepository = tokenRepository;
    this.#authRepository = authRepository;
  }

  async #validateCredential(email, password) {
    const user = await this.#authRepository.getByUsername(email);

    if (!user) {
      throw new Error('User not found');
    }

    return user.checkPassword(password);
  }

  async execute(email, password) {
    const credentialIsValid = await this.#validateCredential(email, password);

    if (!credentialIsValid) {
      return {
        authenticated: false,
      };
    }

    const token = makeToken({ email });

    this.#tokenRepository.save(token);

    return {
      authenticated: true,
      token: token.token,
      refresh_token: token.refreshToken,
    };
  }
}

export default AuthenticateUser;
