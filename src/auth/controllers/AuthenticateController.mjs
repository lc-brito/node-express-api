import RepositoryImpl from '../../core/repository/index.mjs';
import TokenRepository from '../repositories/TokenRepository.mjs';
import AuthRepository from '../repositories/AuthRepository.mjs';
import AuthenticateUser from '../actions/AuthenticateUser.mjs';
import LogoutUser from '../actions/LogoutUser.mjs';
import AuthenticateValidator from './validators/AuthenticateValidator.mjs';
import Logger from '../../core/logger/index.mjs';

const tokenRepository = new TokenRepository(RepositoryImpl);
const authRepository = new AuthRepository(RepositoryImpl);

export async function authenticate(request, response, next) {
  Logger.info('Auth', 'authenticate', `Authenticating user ${request.body.email}`);

  try {
    await AuthenticateValidator.validate(request.body);
  } catch (error) {
    return response
      .status(400)
      .json(error);
  }

  const { email, password } = request.body;

  const authenticateAction = new AuthenticateUser(tokenRepository, authRepository);
  let authorization;

  try {
    authorization = await authenticateAction.execute(email, password);
  } catch (error) {
    Logger.error('Auth', 'authenticate', error.message);

    return next(error);
  }

  return response
    .status(200)
    .json(authorization);
}

export async function logout(request, response, next) {
  const token = request.headers.authorization;

  if (token === null) {
    return response.sendStatus(401);
  }

  const logoutUserAction = new LogoutUser(tokenRepository);

  let authorization;
  try {
    authorization = await logoutUserAction.execute(token);
  } catch (error) {
    return next(error);
  }

  return response
    .status(200)
    .json(authorization);
}
