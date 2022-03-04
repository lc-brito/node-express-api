import RepositoryImpl from '../../core/repository/index.mjs';
import AuthRepository from '../repositories/AuthRepository.mjs';

import RequestChangePassword from '../actions/RequestChangePassword.mjs';

const authRepository = new AuthRepository(RepositoryImpl);

export async function requestChange(request, response, next) {
  const { email } = request.body;

  const requestChangePasswordAction = new RequestChangePassword(authRepository);

  try {
    await requestChangePasswordAction.execute(email);
  } catch (error) {
    return next(error);
  }

  return response
    .status(200)
    .json({ requested: true });
}
