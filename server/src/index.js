/* eslint-disable no-console */

import express from 'express';

import './config/db';
import constants from './config/constants';
import mocks from './mocks';
import middlewares from './config/middlewares.js';

const app = express();

middlewares(app);

// mocks().then(() => {
app.listen(constants.PORT, err => {
  if (err) {
    console.error(err);
  } else {
    console.log(`App listen to port: ${constants.PORT}`);
  }
});
// });
