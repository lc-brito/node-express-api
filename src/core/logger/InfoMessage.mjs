import LogLevel from './LogLevel.mjs';
import Message from './Message.mjs';

class InfoMessage extends Message {
  constructor(context, action, message) {
    super(context, action, message, LogLevel.INFO.name);
  }
}

export default InfoMessage;
