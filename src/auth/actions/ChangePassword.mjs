import InvalidArgumentException from '../../core/exceptions/InvalidArgumentException.mjs';
import InvalidOperationException from '../../core/exceptions/InvalidOperationException.mjs';

class ChangePassword {
  #repository;

  constructor(repository) {
    this.#repository = repository;
  }

  async execute(changePasswordDto) {
    const changePasswordRequest = await this.#repository.getChangePasswordRequestByToken(changePasswordDto.token);

    if (changePasswordRequest === null) {
      throw new InvalidArgumentException('The user didn`t request to change the password');
    }

    if (changePasswordRequest.isExpired()) {
      throw new InvalidOperationException('The change password request expired');
    }

    const user = await this.#repository.getByUsername(changePasswordRequest.email);

    if (user === null) {
      throw new Error('User not found');
    }

    await user.changePassword(changePasswordDto.password);

    await this.#repository.save(user);

    await this.#repository.removeChangePasswordRequest(changePasswordDto.token);
  }
}

export default ChangePassword;
