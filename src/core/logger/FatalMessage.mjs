import LogLevel from './LogLevel.mjs';
import Message from './Message.mjs';

class FatalMessage extends Message {
  constructor(context, action, message) {
    super(context, action, message, LogLevel.FATAL.name);
  }
}

export default FatalMessage;
