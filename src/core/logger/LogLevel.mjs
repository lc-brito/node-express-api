class LogLevel {
  static get FATAL() {
    return {
      name: 'fatal',
      code: 60,
    };
  }

  static get ERROR() {
    return {
      name: 'error',
      code: 50,
    };
  }

  static get WARN() {
    return {
      name: 'warn',
      code: 40,
    };
  }

  static get INFO() {
    return {
      name: 'info',
      code: 30,
    };
  }

  static get DEBUG() {
    return {
      name: 'debug',
      code: 20,
    };
  }

  static get TRACE() {
    return {
      name: 'trace',
      code: 10,
    };
  }
}

export default LogLevel;
