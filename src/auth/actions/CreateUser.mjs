import AuthRepository from '../repositories/AuthRepository.mjs';
import RepositoryImpl from '../../core/repository/index.mjs';

import UsernameValidator from '../application_services/UsernameValidator.js';
import User from '../entities/User.mjs';

class CreateUser {
  #repository;

  constructor(repository) {
    this.#repository = repository;
  }

  async execute(username, password) {
    if (UsernameValidator.isAvailable(username)) {
      throw new Error(`Username ${username} is not available`);
    }

    const user = await User.makeFrom(username, password);

    this.#repository.save(user);
  }
}

export default new CreateUser(
  new AuthRepository(RepositoryImpl),
);
