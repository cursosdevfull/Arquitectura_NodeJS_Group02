import { CACHE_MANAGER, Controller, Get, Inject } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Controller('invalidate-cache')
export class InvalidateCacheController {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}
  @Get()
  async invalidateCache() {
    const prefix = 'course_';
    const keys = await this.cacheManager.store.keys(`${prefix}*`);

    await Promise.all(keys.map((key) => this.cacheManager.del(key)));
    return 'Cache invalidated';
  }
}
