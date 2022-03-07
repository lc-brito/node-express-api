import LogLevel from './LogLevel.mjs';
import Message from './Message.mjs';

class WarnMessage extends Message {
  constructor(context, action, message) {
    super(context, action, message, LogLevel.WARN.name);
  }
}

export default WarnMessage;
