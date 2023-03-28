import express from 'express';
import analysis from './analysisRoute.js';

const routes = (app) => {
  app.use(
    express.json(),
    analysis,
  );
};

export default routes;
