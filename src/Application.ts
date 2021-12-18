import 'dotenv/config';
import 'reflect-metadata';

import express, { Express } from 'express';

import { inject } from './di/decorators';
import { ILogger } from './logs/ILogger';

export class Application {
  private app: Express;

  constructor(
    @inject('Logger')
    private readonly logger: ILogger,
  ) {
    this.app = express();
    this.app.use(express.json());
  }

  server() {
    const port = process.env.PORT || 3333;
    this.app.listen(port, () => {
      this.logger.info(`🚀 Server running on port ${port}!`);
      // console.log(`🚀 Server running on port ${port || 3333}!`);
    });
  }
}
