import jwt from 'jsonwebtoken';
import TokenValidator from '../application_services/TokenValidator.js';

export default async function (request, response, next) {
  const refreshToken = request.headers.authorization;

  if (refreshToken == null) {
    return response
      .status(401)
      .json({ error: 'Refresh token not found' });
  }

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (error, payload) => {
    if (error) {
      return response
        .status(403)
        .json({ error: 'Refresh token invalid' });
    }

    const isExpired = await TokenValidator.isRefreshTokenExpired(refreshToken);
    if (isExpired) {
      return response
        .status(403)
        .json({ error: 'Refresh token invalid' });
    }

    request.user = payload;

    next();
  });
}
