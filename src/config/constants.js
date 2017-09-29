import config from './config.json';

const devConfig = {
  PORT: process.env.PORT || 3001,
  DB_URL: 'mongodb://localhost/ipeedy',
  GRAPHQL_PATH: '/graphql',
  SUBSCRIPTIONS_PATH: '/subscriptions',
  ESMS_API_URL: config.ESMS_API_URL,
  ESMS_API_KEY: config.ESMS_API_KEY,
  ESMS_SECRET_KEY: config.ESMS_SECRET_KEY,
  JWT_SECRET: config.JWT_SECRET,
};

const testConfig = {};

const prodConfig = {
  DB_URL: 'mongodb://163.44.192.90/ipeedy',
};

const defaultConfig = {
  PORT: process.env.PORT || 3000,
  GRAPHQL_PATH: '/graphql',
};

function envConfig(env) {
  switch (env) {
    case 'dev':
      return devConfig;
    case 'test':
      return testConfig;
    default:
      return prodConfig;
  }
}

export default {
  ...defaultConfig,
  ...envConfig(process.env.NODE_ENV),
};
