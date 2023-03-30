import express from 'express';
import customer from './routes/ms-customerRoutes.js';
import transaction from './routes/ms-transactionRoutes.js';
import antiFraud from './routes/ms-anti-fraudRoutes.js';

const app = express();

app.use('/', customer);
app.use('/', transaction);
app.use('/', antiFraud);

export default app;
