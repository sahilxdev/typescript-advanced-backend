import { Request, Response, NextFunction } from 'express';

export function performanceMonitoring(req: Request, res: Response, next: NextFunction) {
  const start = process.hrtime();

  res.on('finish', () => {
    const [seconds, nanoseconds] = process.hrtime(start);
    const duration = seconds * 1000 + nanoseconds / 1000000;
    
    console.log({
      method: req.method,
      url: req.url,
      statusCode: res.statusCode,
      duration: `${duration.toFixed(2)}ms`,
      timestamp: new Date().toISOString()
    });
  });

  next();
}