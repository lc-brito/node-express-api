import configuration from '../../config/cors.mjs';

const DEFAULT_ORIGIN = 'Origin';
const DEFAULT_METHODS = 'GET, HEAD, PUT, PATCH, POST, DELETE, OPTIONS';
const DEFAULT_HEADERS = 'X-Requested-With, Content-Type, X-Token-Auth, Authorization';

export default (request, response, next) => {
  const allowedDomains = configuration.origin.join(', ') || DEFAULT_ORIGIN;
  const allowedMethods = configuration.methods.join(', ') || DEFAULT_METHODS;
  const allowedHeaders = configuration.headers.join(', ') || DEFAULT_HEADERS;

  response.header('Access-Control-Allow-Origin', allowedDomains);
  response.header('Access-Control-Allow-Methods', allowedMethods);
  response.header('Access-Control-Allow-Headers', allowedHeaders);
  response.header('Access-Control-Allow-Credentials', configuration.credentials);

  next();
};
