import { dispatch as EventDispatcher } from '../../core/event/index.mjs';
import ChangePasswordRequestedEvent from '../events/ChangePasswordRequestedEvent.mjs';
import InvalidArgumentException from '../../core/exceptions/InvalidArgumentException.mjs';
import ChangePasswordRequest from '../entities/ChangePasswordRequest.mjs';

class RequestChangePassword {
  #repository;

  constructor(repository) {
    this.#repository = repository;
  }

  async execute(email) {
    const user = await this.#repository.getByUsername(email);

    if (!user) {
      throw new InvalidArgumentException('User not found');
    }

    const currentChangePasswordRequest = await this.#repository.getActiveChangePasswordRequestByEmail(email);
    if (currentChangePasswordRequest !== null) {
      EventDispatcher(
        new ChangePasswordRequestedEvent(currentChangePasswordRequest),
      );

      return;
    }

    const changePasswordRequest = new ChangePasswordRequest(email);
    await this.#repository.saveChangePasswordRequest(changePasswordRequest);

    EventDispatcher(
      new ChangePasswordRequestedEvent(changePasswordRequest),
    );
  }
}

export default RequestChangePassword;
