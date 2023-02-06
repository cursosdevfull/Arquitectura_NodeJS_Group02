import {
  CACHE_MANAGER,
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Cache } from 'cache-manager';
import { Observable } from 'rxjs';

@Injectable()
export class CacheInterceptor implements NestInterceptor {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const res = context.switchToHttp().getResponse();
    const key = res.locals.cacheKey;
    const value = await this.cacheManager.get(key);

    /* if (value) {
      console.log('Response from Cache');
      return of(value);
    } */

    return next.handle();
  }
}
