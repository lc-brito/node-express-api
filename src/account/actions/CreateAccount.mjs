import Account from '../entities/Account.mjs';
import CreateUser from '../../auth/actions/CreateUser.mjs';

class CreateAccount {
  #repository;

  constructor(repository) {
    this.#repository = repository;
  }

  async execute(accountDto) {
    const account = new Account(accountDto.name, accountDto.email, accountDto.birth_date);

    try {
      await this.#repository.save(account);
      await CreateUser.execute(accountDto.email, accountDto.password);
    } catch (error) {
      await this.#repository.remove(account.id);

      throw error;
    }

    return account.id;
  }
}

export default CreateAccount;
