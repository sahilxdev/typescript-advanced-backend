
import { Request, Response, NextFunction } from 'express';
import { CacheService } from '../services/CacheService';

const cacheService = new CacheService();

export function cacheMiddleware(duration: number = 60) {
  return (req: Request, res: Response, next: NextFunction) => {
    const key = `__express__${req.originalUrl}`;
    const cachedResponse = cacheService.get(key);

    if (cachedResponse) {
      res.send(cachedResponse);
      return;
    }

    const originalSend = res.send;
    res.send = function(body): Response {
      cacheService.set(key, body, duration);
      return originalSend.call(this, body);
    };

    next();
  };
}