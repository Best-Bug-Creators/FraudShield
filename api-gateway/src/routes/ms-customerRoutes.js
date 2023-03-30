import {} from 'dotenv/config';
import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

const host = process.env.CUSTOMER_HOST;
const port = process.env.CUSTOMER_PORT;

const customerProxy = createProxyMiddleware({
  target: `http://${host}:${port}`,
  changeOrigin: true,
});

const customerRoutes = express.Router();

customerRoutes
  .get('/customers/invoiceExp/:customerId', customerProxy)
  .get('/customers/:id', customerProxy)
  .post('/customers/validateCard', customerProxy)
  .post('/customers/login', customerProxy);

export default customerRoutes;
