const PRODUCTION = 'production';
const DEVELOPMENT = 'development';
const STAGING = 'staging';

function isEnvironmentEqualsTo(environment) {
  return process.env.ENVIRONMENT === environment;
}

function isInProductionMode() {
  return isEnvironmentEqualsTo(PRODUCTION);
}

function isInStagingMode() {
  return isEnvironmentEqualsTo(STAGING);
}

function isInDevelopmentMode() {
  return isEnvironmentEqualsTo(DEVELOPMENT);
}

function baseUrl() {
  return process.env.BASE_URL;
}

export default {
  isInProductionMode,
  isInStagingMode,
  isInDevelopmentMode,
  baseUrl,
};
