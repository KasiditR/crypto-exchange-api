import { Request, Response, NextFunction } from 'express';

export const errorLogger = (err: Error, req: Request, res: Response, next: NextFunction) => {
  const now = new Date();
  const options = { timeZone: 'Asia/Bangkok', hour12: false };
  const timestamp = now.toLocaleString('en-US', {
    ...options,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });

  console.error(`[${timestamp}] Error in ${req.method} ${req.url}: ${err.message}`);

  next(err);
};
