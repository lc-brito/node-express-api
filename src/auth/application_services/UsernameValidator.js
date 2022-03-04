import AuthRepository from '../repositories/AuthRepository.mjs';
import RepositoryImpl from '../../core/repository/index.mjs';

class UsernameValidator {
  #repository;

  constructor(repository) {
    this.#repository = repository;
  }

  isAvailable(username) {
    const user = this.#repository.getByUsername(username);

    return !user;
  }
}

export default new UsernameValidator(
  new AuthRepository(RepositoryImpl),
);
