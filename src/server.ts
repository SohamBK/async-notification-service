import { createApp } from './app';

export function startServer(port: number) {
  const app = createApp();

  const server = app.listen(port, () => {
    console.log(`HTTP server listening on port ${port}`);
  });

  // Graceful shutdown
  const shutdown = (signal: string) => {
    console.log(`Received ${signal}. Shutting down gracefully...`);

    server.close(() => {
      console.log('HTTP server closed');
      process.exit(0);
    });
  };

  process.on('SIGTERM', shutdown);
  process.on('SIGINT', shutdown);

  return server;
}
