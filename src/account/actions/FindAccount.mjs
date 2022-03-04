import DataNotFoundException from '../../core/exceptions/DataNotFoundException.mjs';

class FindAccount {
  #repository;

  constructor(repository) {
    this.#repository = repository;
  }

  async execute(accountId) {
    const account = await this.#repository.getById(accountId);

    if (!account) {
      throw new DataNotFoundException(`Account not found: ${accountId}`);
    }

    return account;
  }
}

export default FindAccount;
