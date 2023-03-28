import express from 'express';
import transaction from './transactionRoute.js';

const routes = (app) => {
  app.use(
    express.json(),
    transaction,
  );
};

export default routes;
