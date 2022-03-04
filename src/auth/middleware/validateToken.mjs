import jwt from 'jsonwebtoken';
import TokenValidator from '../application_services/TokenValidator.js';

export default async function (request, response, next) {
  const token = request.headers.authorization;

  if (token == null) {
    return response
      .status(401)
      .json({ error: 'Token not found' });
  }

  jwt.verify(token, process.env.TOKEN_SECRET, async (error, payload) => {
    if (error) {
      return response
        .status(403)
        .json({ error: 'Token invalid' });
    }

    const isExpired = await TokenValidator.isTokenExpired(token);
    if (isExpired) {
      return response
        .status(403)
        .json({ error: 'Token invalid' });
    }

    request.user = payload;

    next();
  });
}
