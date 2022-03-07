import RepositoryImpl from '../../core/repository/index.mjs';
import AuthRepository from '../repositories/AuthRepository.mjs';

import ChangePassword from '../actions/ChangePassword.mjs';

import ChangePasswordValidator from './validators/ChangePasswordValidator.mjs';
import Logger from '../../core/logger/index.mjs';

const authRepository = new AuthRepository(RepositoryImpl);

export async function change(request, response, next) {
  Logger.info('Auth', 'change password', `User changing password using token ${request.body.token}`);

  const changePasswordDto = {
    token: request.body.token,
    password: request.body.password,
  };

  try {
    await ChangePasswordValidator.validate(changePasswordDto);
  } catch (error) {
    return response
      .status(400)
      .json(error);
  }
  const changePasswordAction = new ChangePassword(authRepository);

  try {
    await changePasswordAction.execute(changePasswordDto);
  } catch (error) {
    Logger.error('Auth', 'change password', error.message);

    return next(error);
  }

  return response
    .status(200)
    .json({ updated: true });
}
