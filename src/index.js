import 'dotenv/config';
import { initMongoConnection } from './db/initMongoConnection.js';
import { setupServer } from './server.js';

const bootstrap = async () => {
  try {
    await initMongoConnection();
    setupServer();
  } catch (e) {
    console.error('Failed to start app:', e);
    process.exit(1);
  }
};

bootstrap();
