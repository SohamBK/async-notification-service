import { startServer } from './server';

const PORT = Number(process.env.PORT) || 3000;

startServer(PORT);
