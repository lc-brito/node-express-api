import Application from '../../src/support/Application.mjs';
import BaseException from '../../src/core/exceptions/BaseException.mjs';
import Logger from '../../src/core/logger/index.mjs';

function handleRejection(reason) {
  Logger.error('Rejection', 'Unhandled Rejection', reason);
  throw reason;
}

function isTrustedError(error) {
  if (error instanceof BaseException) {
    return error.isOperational;
  }

  return false;
}

function handleException(error) {
  Logger.error('Exception', 'Uncaught exception thrown: ', error.message);

  if (!isTrustedError(error)) {
    process.exit(1);
  }
}

function handleError(error, request, response, next) {
  if (response.headersSent) {
    return next(error);
  }

  const status = error.httpCode || 500;

  const responseObject = {
    status,
    message: error.message,
  };

  if (!Application.isInProductionMode()) {
    responseObject.stack = error.stack || null;
  }

  Logger.fatal('Error', 'Handle error', error.message);

  return response
    .status(status)
    .json(responseObject);
}

function handleServerError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  switch (error.code) {
    case 'EACCES':
      console.error('Requires elevated privileges');
      handleException(error);
      break;

    case 'EADDRINUSE':
      console.error('Address is already in use');
      handleException(error);
      break;

    default:
      throw error;
  }
}

function handleSigterm(server) {
  Logger.fatal('SIGTERM', 'Handle SIGTERM', 'SIGTERM signal received.');

  server.close(() => {
    Logger.fatal('SIGTERM', 'Handle SIGTERM', 'Http server closed.');
  });
}

function handleAppErrors(app) {
  app.use(handleError);

  process.on('unhandledRejection', handleRejection);

  process.on('uncaughtException', handleException);
}

function handleServerErrors(server) {
  server.on('error', handleServerError);

  process.on('SIGTERM', () => handleSigterm(server));

  process.on('SIGINT', () => handleSigterm(server));
}

export default {
  boot: handleAppErrors,
  handleServerErrors,
};
