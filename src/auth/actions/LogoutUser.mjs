class LogoutUser {
  #repository;

  constructor(repository) {
    this.#repository = repository;
  }

  async execute(tokenString) {
    const token = await this.#repository.getByToken(tokenString);

    if (token === null) {
      return {
        authenticated: false,
      };
    }

    await this.#repository.remove(token);

    return {
      authenticated: false,
    };
  }
}

export default LogoutUser;
