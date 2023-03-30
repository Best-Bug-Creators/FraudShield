/* eslint-disable no-console */
import 'express-async-errors';
import express from 'express';
import swaggerUiExpress from 'swagger-ui-express';
import db from './config/dbConfig.js';
import routes from './routes/index.js';
import errorMiddleware from './middleware/error.middleware.js';
import swaggerDocument from '../swagger/transaction-swagger.json';

db.on('error', console.log.bind(console, 'Connection error'));
db.once('open', () => console.log('Database connection was successful'));

const app = express();
app.use(express.json());

routes(app);
app.use(errorMiddleware);

app.use('/api-docs', swaggerUiExpress.serve);
app.use('/api-docs', swaggerUiExpress.setup(swaggerDocument));

export default app;
