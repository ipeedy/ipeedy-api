/* eslint-disable no-console */

import express from 'express';
import notifier from 'node-notifier';
import { makeExecutableSchema } from 'graphql-tools';
import { graphqlExpress } from 'apollo-server-express';

import constants from './config/constants';
import middlewares from './config/middlewares';
import typeDefs from './graphql/schema';
import resolvers from './graphql/resolvers';

import './config/database';

const app = express();

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

middlewares(app);

app.use(constants.GRAPHQL_PATH, graphqlExpress({ schema }));

app.listen(constants.PORT, err => {
  if (err) {
    console.log(err);
    notifier.notify({
      title: 'Inspery API',
      message: 'Service failed to start!',
    });
  } else {
    console.log(`Ipeedy API is up on port ${constants.PORT}!`);
    notifier.notify({
      title: 'Inspery API',
      message: 'Service started!',
    });
  }
});
