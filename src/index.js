/* eslint-disable no-console */

import express from 'express';
import notifier from 'node-notifier';
import { createServer } from 'http';
import { makeExecutableSchema } from 'graphql-tools';
import { graphqlExpress } from 'apollo-server-express';
import { execute, subscribe } from 'graphql';
import { SubscriptionServer } from 'subscriptions-transport-ws';

import constants from './config/constants';
import middlewares from './config/middlewares';
import typeDefs from './graphql/schema';
import resolvers from './graphql/resolvers';

import './config/database';

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const app = express();

middlewares(app);

app.use(
  constants.GRAPHQL_PATH,
  graphqlExpress(req => ({
    schema,
    context: {
      user: req.user,
    },
  })),
);

const graphQLServer = createServer(app);

graphQLServer.listen(constants.PORT, err => {
  if (err) {
    console.log(err);
    notifier.notify({
      title: 'Inspery API',
      message: 'Service failed to start!',
    });
  } else {
    new SubscriptionServer( // eslint-disable-line
      {
        schema,
        execute,
        subscribe,
      },
      {
        server: graphQLServer,
        path: constants.SUBSCRIPTIONS_PATH,
      },
    );
    console.log(`Ipeedy API is up on port ${constants.PORT}!`);
    notifier.notify({
      title: 'Inspery API',
      message: 'Service started!',
    });
  }
});
