import User from '../entities/User.mjs';
import ChangePasswordRequest from '../entities/ChangePasswordRequest.mjs';

class AuthRepository {
  #storage;

  #authCollection = 'auth';

  #changePasswordCollection = 'change-password';

  #tokensCollection = 'tokens';

  constructor(storageImpl) {
    this.#storage = storageImpl;
    this.#storage.createCollection(this.#authCollection);
    this.#storage.createCollection(this.#changePasswordCollection);
  }

  async save(user) {
    return this
      .#storage
      .save(this.#authCollection, user.asObject());
  }

  async remove(user) {
    return this
      .#storage
      .remove(this.#authCollection, user.username);
  }

  async getByUsername(email) {
    const user = await this
      .#storage
      .get(this.#authCollection, email);

    if (!user) {
      return null;
    }

    return User.from(
      user.email,
      user.password,
      user.created_at,
      user.updated_at,
    );
  }

  async saveChangePasswordRequest(request) {
    return this
      .#storage
      .save(this.#changePasswordCollection, request.asObject());
  }

  async removeChangePasswordRequest(token) {
    return this
      .#storage
      .remove(this.#changePasswordCollection, token);
  }

  async getChangePasswordRequestByToken(token) {
    const request = await this
      .#storage
      .get(this.#changePasswordCollection, token);

    if (request === null) {
      return null;
    }

    return ChangePasswordRequest.from(
      request.email,
      request.token,
      new Date(request.expire_at),
    );
  }

  async getActiveChangePasswordRequestByEmail(email) {
    const allRequests = await this.getAllChangePasswordRequest();

    const activeRequestsCollection = allRequests.filter((request) => request.email === email && request.isActive());

    if (activeRequestsCollection.length === 0) {
      return null;
    }

    return activeRequestsCollection.shift();
  }

  async getAllChangePasswordRequest() {
    const changePasswordRequests = await this
      .#storage
      .getAll(this.#changePasswordCollection);

    return changePasswordRequests.map((request) => ChangePasswordRequest.from(
      request.email,
      request.token,
      new Date(request.expire_at),
    ));
  }
}

export default AuthRepository;
