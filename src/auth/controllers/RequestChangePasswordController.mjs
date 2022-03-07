import RepositoryImpl from '../../core/repository/index.mjs';
import AuthRepository from '../repositories/AuthRepository.mjs';
import Logger from '../../core/logger/index.mjs';

import RequestChangePassword from '../actions/RequestChangePassword.mjs';

const authRepository = new AuthRepository(RepositoryImpl);

export async function requestChange(request, response, next) {
  Logger.info('Auth', 'request change password', `User ${request.body.email} request to change password`);

  const { email } = request.body;

  const requestChangePasswordAction = new RequestChangePassword(authRepository);

  try {
    await requestChangePasswordAction.execute(email);
  } catch (error) {
    Logger.error('Auth', 'request change password', error.message);

    return next(error);
  }

  return response
    .status(200)
    .json({ requested: true });
}
