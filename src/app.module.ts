import {
  CacheModule,
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { ThrottlerModule } from '@nestjs/throttler';
import * as redisStore from 'cache-manager-redis-store';

import { AppService } from './app.service';
import { CacheMiddleware } from './core/middlewares/cache/cache.middleware';
import { HealthcheckController } from './healthcheck/healthcheck.controller';
import { InvalidateCacheController } from './invalidate-cache/invalidate-cache.controller';
import { AuthModule } from './modules/auth/auth.module';
import { CourseModule } from './modules/course/course.module';
import { SupportModule } from './modules/support/support.module';
import { UserModule } from './modules/user/user.module';

const controllers = [];
const imports = [CqrsModule, CourseModule, ConfigModule.forRoot()];
@Module({
  imports: [
    ...imports,
    AuthModule,
    UserModule,
    SupportModule,
    CacheModule.register({
      store: redisStore,
      host: 'localhost',
      port: 6390,
      ttl: 60,
    }),
    ThrottlerModule.forRoot({
      limit: 10,
      ttl: 60,
    }),
  ],
  controllers: [
    ...controllers,
    HealthcheckController,
    InvalidateCacheController,
  ],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CacheMiddleware).forRoutes({
      path: '/course',
      method: RequestMethod.GET,
    });
  }
}
