import type { Request, Response, NextFunction } from "express";

interface RateLimitStore {
  [ip: string]: {
    count: number;
    resetTime: number;
  };
}

const store: RateLimitStore = {};
const WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS = 30; // Max requests per minute

export function rateLimiter(req: Request, res: Response, next: NextFunction): void {
  const ip = req.ip || req.socket.remoteAddress || "unknown";
  const now = Date.now();

  if (!store[ip]) {
    store[ip] = { count: 1, resetTime: now + WINDOW_MS };
    return next();
  }

  const limitData = store[ip]!;

  if (now > limitData.resetTime) {
    limitData.count = 1;
    limitData.resetTime = now + WINDOW_MS;
    return next();
  }

  limitData.count += 1;

  if (limitData.count > MAX_REQUESTS) {
    res.status(429).json({
      error: "Too many submissions. Please wait 1 minute before trying again.",
    });
    return;
  }

  next();
}
