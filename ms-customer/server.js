/* eslint-disable no-console */
import app from './src/app.js';
import db from './src/config/dbConnect.js';
import {} from 'dotenv/config';

db.on('error', console.log.bind(console, 'Database connection error.'));
db.once('open', () => console.log('Connection to the database successfully completed.'));

const port = process.env.PORT || 3002;

app.listen(port, () => console.log(`Server listening on http://localhost:${port}`));
