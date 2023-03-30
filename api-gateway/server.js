import {} from 'dotenv/config';
import app from './src/app.js';

const port = process.env.API_GATEWAY_PORT || 3000;

app.listen(port, () => console.log(`Servidor escutando na porta ${port}`));
