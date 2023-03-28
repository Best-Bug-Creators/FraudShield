import app from './src/app.js';
import {} from 'dotenv/config';

const port = process.env.PORT || 3001;

app.listen(port, () => console.log(`Server listen in http://localhost:${port}`));
