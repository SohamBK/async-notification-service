import { createApp } from './app';
import { prisma } from './db/prisma';

export function startServer(port: number) {
  const app = createApp();

  const server = app.listen(port, () => {
    console.log(`HTTP server listening on port ${port}`);
  });

  const shutdown = async (signal: string) => {
    console.log(`Received ${signal}. Shutting down gracefully...`);

    await prisma.$disconnect();

    server.close(() => {
      console.log('HTTP server closed');
      process.exit(0);
    });
  };

  process.on('SIGTERM', shutdown);
  process.on('SIGINT', shutdown);

  return server;
}
