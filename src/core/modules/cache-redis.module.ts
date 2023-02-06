import { CacheModule, DynamicModule, Module } from '@nestjs/common';
import * as redisStore from 'cache-manager-redis-store';

@Module({})
export class CacheModuleRedis {
  static register(dbConfigRedis: any): DynamicModule {
    const config = dbConfigRedis;
    return CacheModule.register({
      store: redisStore,
      host: config.host,
      port: config.port,
      ttl: config.ttl,
    });
  }
}
