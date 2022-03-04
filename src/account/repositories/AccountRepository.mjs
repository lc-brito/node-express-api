import AccountMapper from './mappers/Account.mjs';

class AccountRepository {
  #storage;

  #collection = 'account';

  constructor(storageImpl) {
    this.#storage = storageImpl;
    this.#storage.createCollection(this.#collection);
  }

  async save(account) {
    return this
      .#storage
      .save(this.#collection, AccountMapper.mapToDatabase(account));
  }

  async remove(account) {
    return this
      .#storage
      .remove(this.#collection, account.id);
  }

  async getById(id) {
    const accountRaw = await this
      .#storage
      .get(this.#collection, id);

    if (!accountRaw) {
      return null;
    }

    return AccountMapper.mapFromDatabase(accountRaw);
  }

  async getAll() {
    const accounts = await this
      .#storage
      .getAll(this.#collection);

    return accounts.map((artistRaw) => AccountMapper.mapFromDatabase(artistRaw));
  }
}

export default AccountRepository;
