import 'express-async-errors';
import express from 'express';
import db from './config/dbConnect.js';
import routes from './routes/index.js';
import errorMiddleware from './middleware/error.middleware';

db.on('error', console.log.bind(console, 'Connection error'));

db.once('open', () => console.log('Database connection was successful'));

const app = express();

app.use(express.json());

routes(app);

app.use(errorMiddleware);

export default app;
