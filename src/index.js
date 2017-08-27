/* eslint-disable no-console */

import express from 'express';
import notifier from 'node-notifier';

import constants from './config/constants';
import middlewares from './config/middlewares';

import './config/database';

const app = express();

middlewares(app);

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
