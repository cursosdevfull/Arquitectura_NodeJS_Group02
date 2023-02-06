import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class CacheMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    console.log('CacheMiddleware', req.url);
    const key = this.getKey(req);
    res.locals.cacheKey = key;
    console.log('key', key);
    next();
  }

  getKey(req: Request) {
    let prefix = 'course_';
    let key = `${prefix}cursosdev_${req.url.replace(/\//g, '_')}`;

    if (req.params) {
      key = this.getParameters(key, req.params);
    }

    if (req.query) {
      key = this.getParameters(key, req.query);
    }

    if (req.body) {
      key = this.getParameters(key, req.body);
    }

    return key;
  }

  getParameters(key: string, params: Record<string, any>) {
    return Object.keys(params).reduce((acc, curr) => {
      acc += `_${curr}:${params[curr]}`;
      return acc;
    }, key);
  }
}
