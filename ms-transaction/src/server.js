import app from './app.js';
import {} from 'dotenv/config';

const port = process.env.PORT || '3003';

app.listen(port, () => console.log(`Server listen in http://localhost:${port}`));
