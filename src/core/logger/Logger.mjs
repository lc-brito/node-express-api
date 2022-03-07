import InfoMessage from './InfoMessage.mjs';
import WarnMessage from './WarnMessage.mjs';
import ErrorMessage from './ErrorMessage.mjs';
import FatalMessage from './FatalMessage.mjs';
import PinoLogger from '../../../adapters/log/Pino.mjs';

class Logger {
  #logger;

  constructor(logger) {
    this.#logger = logger;
  }

  info(context, action, message) {
    this.#logger.log(
      new InfoMessage(context, action, message),
    );
  }

  warn(context, action, message) {
    this.#logger.log(
      new WarnMessage(context, action, message),
    );
  }

  error(context, action, message) {
    this.#logger.log(
      new ErrorMessage(context, action, message),
    );
  }

  fatal(context, action, message) {
    this.#logger.log(
      new FatalMessage(context, action, message),
    );
  }
}

export default new Logger(PinoLogger);
