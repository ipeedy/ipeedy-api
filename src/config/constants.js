const devConfig = {
  PORT: process.env.PORT || 3000,
  DB_URL: 'mongodb://localhost/ipeedy',
  GRAPHQL_PATH: '/graphql',
  ESMS_API_URL: 'https://59588a4fea985b08e80959b9.koor.io/requestOTP',
  ESMS_API_KEY: 'THISISESMSAPIKEY',
  ESMS_SECRET_KEY: 'THISISESMSSECRETKEY',
  JWT_SECRET: '부이탄콰',
};

const testConfig = {};

const prodConfig = {};

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
