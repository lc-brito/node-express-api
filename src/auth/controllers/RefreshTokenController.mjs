import RepositoryImpl from '../../core/repository/index.mjs';
import TokenRepository from '../repositories/TokenRepository.mjs';

import RefreshToken from '../actions/RefreshToken.mjs';

const tokenRepository = new TokenRepository(RepositoryImpl);

export async function refresh(request, response, next) {
  const refreshToken = request.headers.authorization;

  if (refreshToken === null) {
    return response.sendStatus(401);
  }

  const { user } = request;

  const refreshTokenAction = new RefreshToken(tokenRepository);
  let authorization;

  try {
    authorization = await refreshTokenAction.execute(refreshToken, user);
  } catch (error) {
    return next(error);
  }

  return response
    .status(200)
    .json(authorization);
}
