import {} from 'dotenv/config';
import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

const host = process.env.ANTI_FRAUD_HOST;
const port = process.env.ANTI_FRAUD_PORT;

const antiFraudProxy = createProxyMiddleware({
  target: `http://${host}:${port}`,
  changeOrigin: true,
});

const antiFraudRoutes = express.Router();

antiFraudRoutes
  .get('/analyses', antiFraudProxy)
  .get('/analyses/under-review', antiFraudProxy)
  .get('/analyses/:id', antiFraudProxy)
  .post('/analyses', antiFraudProxy)
  .patch('/analyses/:id', antiFraudProxy)
  .delete('/analyses/:id', antiFraudProxy);

export default antiFraudRoutes;
