import RepositoryImpl from '../../core/repository/index.mjs';
import AuthRepository from '../repositories/AuthRepository.mjs';

import ChangePassword from '../actions/ChangePassword.mjs';

import ChangePasswordValidator from './validators/ChangePasswordValidator.mjs';

const authRepository = new AuthRepository(RepositoryImpl);

export async function change(request, response, next) {
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
    return next(error);
  }

  return response
    .status(200)
    .json({ updated: true });
}
