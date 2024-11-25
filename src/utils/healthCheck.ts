import { Request, Response } from 'express';
import { AppDataSource } from '../config/database';

export class HealthCheck {
  static async check(req: Request, res: Response) {
    const healthCheck = {
      uptime: process.uptime(),
      message: 'OK',
      timestamp: Date.now(),
      checks: {
        database: false,
        memory: false
      }
    };

    try {
      // Database health check
      await AppDataSource.query('SELECT 1');
      healthCheck.checks.database = true;
    } catch (error) {
      healthCheck.message = 'ERROR';
    }

    // Memory usage check
    const memoryUsage = process.memoryUsage();
    healthCheck.checks.memory = memoryUsage.heapUsed < 734003200; // 700MB threshold

    const status = healthCheck.message === 'OK' ? 200 : 503;
    res.status(status).json(healthCheck);
  }
}

