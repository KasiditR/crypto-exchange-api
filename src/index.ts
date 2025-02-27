import express, { Application } from 'express';
import { envVar } from './configs/envVar';
import sequelize, { loadModels, seedDatabase } from './configs/database';
import { MainRouter } from './routes';
import { errorLogger } from './middleware/errorLogger';
import { errorHandler } from './middleware/errorHandler';

const app: Application = express();
const port = envVar.port;

app.use(express.json());
app.use('/api', MainRouter);

app.use(errorLogger);
app.use(errorHandler);

app.listen(port, async () => {
  try {
    await loadModels();
    await sequelize.sync();
    await seedDatabase();
    console.log(`[server]: Server is running at http://localhost:${port}`);
  } catch (error: any) {
    console.error(`[server]: `, error.message);
  }
});
