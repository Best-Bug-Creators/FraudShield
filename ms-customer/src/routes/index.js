import express from 'express';
import customer from './customerRoutes.js';

const routes = (app) => {
  app.route('/').get((req, res) => {
    res.status(200).send({ title: 'Customer API' });
  });

  app.use(
    express.json(),
    customer,
  );
};

export default routes;
