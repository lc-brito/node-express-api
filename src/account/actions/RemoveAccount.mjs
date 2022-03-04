import DataNotFoundException from '../../core/exceptions/DataNotFoundException.mjs';

class RemoveAccount {
  #repository;

  constructor(repository) {
    this.#repository = repository;
  }

  async execute(accountId) {
    const account = await this.#repository.getById(accountId);

    if (!account) {
      throw new DataNotFoundException(`Account not found: ${accountId}`);
    }

    await this.#repository.remove(account);
  }
}

export default RemoveAccount;
