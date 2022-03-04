import jwt from 'jsonwebtoken';
import Token from '../entities/Token.js';

export default function (tokenPayload) {
  // const fiveMinutesFromNow = (new Date()).setMinutes(new Date().getMinutes() + 5);
  const fiveMinutesFromNow = (new Date()).setSeconds(new Date().getSeconds() + 10);
  const oneDayFromNow = (new Date()).setHours(new Date().getHours() + 24);

  const token = jwt.sign(
    tokenPayload,
    process.env.TOKEN_SECRET,
    {
      expiresIn: fiveMinutesFromNow,
    },
  );

  const refreshToken = jwt.sign(
    tokenPayload,
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: oneDayFromNow,
    },
  );

  return new Token(
    token,
    refreshToken,
    fiveMinutesFromNow,
    oneDayFromNow,
  );
}
