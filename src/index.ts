import 'dotenv/config';
import { startServer } from './server';
import { env } from './config/env';

startServer(env.PORT);
