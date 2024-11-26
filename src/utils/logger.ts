import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

class Logger {
  private logger: winston.Logger;

  constructor() {
    const fileRotateTransport = new DailyRotateFile({
      filename: 'logs/application-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d'
    });

    this.logger = winston.createLogger({
      level: process.env.LOG_LEVEL || 'info',
      format: winston.format.combine(
        winston.format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss'
        }),
        winston.format.errors({ stack: true }),
        winston.format.splat(),
        winston.format.json()
      ),
      defaultMeta: { service: 'backend-service' },
      transports: [
        // Console transport for development
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple()
          )
        }),
        // File transport for production
        fileRotateTransport
      ]
    });
  }

  info(message: string, meta?: any) {
    this.logger.info(message, meta);
  }

  error(message: string, error?: Error) {
    this.logger.error(message, error);
  }

  warn(message: string, meta?: any) {
    this.logger.warn(message, meta);
  }

  debug(message: string, meta?: any) {
    this.logger.debug(message, meta);
  }

  // Centralized error tracking method
  trackError(error: Error, context?: Record<string, any>) {
    this.logger.error('Unhandled Error', {
      error: {
        message: error.message,
        stack: error.stack,
        name: error.name
      },
      context
    });

    // Optionally integrate with error tracking services like Sentry
    // Sentry.captureException(error);
  }
}

export const logger = new Logger();

// Example middleware for request logging
export function requestLoggerMiddleware(req: Request, res: Response, next: NextFunction) {
  const start = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - start;
    logger.info(`${req.method} ${req.url}`, {
      method: req.method,
      url: req.url,
      statusCode: res.statusCode,
      duration,
      ip: req.ip
    });
  });

  next();
}