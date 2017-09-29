/* eslint-disable no-param-reassign */

import bodyParser from 'body-parser';

import { decodeToken } from '../services/auth';
// import mocks from '../mocks';

async function auth(req, res, next) {
  try {
    const token = req.headers.authorization;
    if (token) {
      const user = await decodeToken(token);
      req.user = user;
    } else {
      req.user = null;
    }
    return next();
  } catch (error) {
    throw error;
  }
}

export default async app => {
  // await mocks();
  app.use(bodyParser.json());
  app.use(auth);
};
