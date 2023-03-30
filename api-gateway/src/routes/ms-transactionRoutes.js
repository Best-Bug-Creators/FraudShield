import {} from 'dotenv/config';
import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

const host = process.env.TRANSACTION_HOST;
const port = process.env.TRANSACTION_PORT;

const transactionProxy = createProxyMiddleware({
  target: `http://${host}:${port}`,
  changeOrigin: true,
});

const transactionRoutes = express.Router();

transactionRoutes
  .get('/transactions/:id', transactionProxy)
  .post('/transactions', transactionProxy)
  .patch('/transactions/:id', transactionProxy);

export default transactionRoutes;
