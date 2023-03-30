import express from 'express';
import routes from './routes/index.js';
import passport from './authentication/authStrategies.js';

const app = express();
app.use(express.json());
app.use(passport.initialize());
routes(app);

export default app;
