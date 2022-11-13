import Application from '../../src/support/Application.mjs';
import BaseException from '../../src/core/exceptions/BaseException.mjs';
import Logger from '../../src/core/logger/index.mjs';

function handleError(error) {
  // TODO: send errors to logger (CloudWatch, LogStash, Sentry, etc)
  // TODO: notify admins for critical errors

  if (!Application.isInProductionMode()) {
    Logger.error(error);
    Logger.error('Finishing pending tasks....');
  }
}

function isTrustedError(error) {
  if (error instanceof BaseException) {
    return error.isOperational;
  }

  return false;
}

function handleRejection(reason) {
  Logger.error('Rejection', 'Unhandled Rejection', reason);
  throw reason;
}

function handleException(error) {
  Logger.error('Exception', 'Uncaught exception thrown: ', error.message);

  handleError(error);

  if (!isTrustedError(error)) {
    process.exit(1);
  }
}

async function handleExpressError(error, request, response, next) {
  if (response.headersSent) {
    return next(error);
  }

  handleError(error);

  const status = error.httpCode || 500;

  const responseObject = {
    status,
    message: error.message,
  };

  if (!Application.isInProductionMode()) {
    responseObject.stack = error.stack || null;
  }

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
      Logger.error('Requires elevated privileges');
      break;

    case 'EADDRINUSE':
      Logger.error('Address is already in use');
      break;

    default:
      Logger.error(error);
  }
}

function handleAppErrors(app) {
  app.use(handleExpressError);

  process.on('unhandledRejection', handleRejection);

  process.on('uncaughtException', handleException);
}

function gracefulShutdown() {
  // TODO: do what is required before closing the server (Close connections, sockets, etc)
  Logger.info('Finishing pending tasks....');
}

function handleServerErrors(server) {
  server.on('close', () => {
    gracefulShutdown();
    Logger.error('Server closed');
    process.exit(0);
  });

  server.on('error', (error) => {
    handleServerError(error);
    server.close();
  });

  process.on('SIGTERM', () => {
    Logger.info('SIGTERM signal received');
    process.exit(1);
  });

  process.on('SIGINT', () => {
    Logger.info('SIGINT signal received');
    process.exit(1);
  });
}

export default {
  boot: handleAppErrors,
  handleServerErrors,
};
