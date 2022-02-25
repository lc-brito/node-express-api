import BaseException from './BaseException.mjs';
import StatusCode from '../http/StatusCode.mjs';

class InvalidArgumentException extends BaseException {
  constructor(message = 'Invalid argument') {
    super(StatusCode.BAD_REQUEST(), message, true);
  }
}

export default InvalidArgumentException;
