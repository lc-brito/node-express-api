import pino from 'pino';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class Pino {
  #LEVELS = {
    emergency: 80,
    alert: 70,
    critical: 60,
    error: 50,
    warning: 40,
    notice: 30,
    info: 20,
    debug: 10,
  };

  #logger;

  constructor() {
    const streams = []
      .concat(this.#streams())
      .concat({ stream: process.stdout });

    this.#logger = pino(
      {
        level: process.env.LOG_LEVEL || 'info',
        customLevels: this.#LEVELS,
      },
      pino.multistream(
        streams,
        {
          levels: this.#LEVELS,
          dedupe: true,
        },
      ),
    );
  }

  #streams() {
    return Object
      .keys(this.#LEVELS)
      .map((level) => ({
        level,
        stream: pino.destination(`${__dirname}/../../logs/${level}.log`),
      }));
  }

  log(message) {
    this.#logger[message.level]({
      context: message.context,
      action: message.action,
      message: message.message,
    });
  }
}

export default new Pino();
