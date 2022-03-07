import LogLevel from './LogLevel.mjs';
import Message from './Message.mjs';

class ErrorMessage extends Message {
  constructor(context, action, message) {
    super(context, action, message, LogLevel.ERROR.name);
  }
}

export default ErrorMessage;
