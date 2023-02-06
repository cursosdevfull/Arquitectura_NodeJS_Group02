import { CacheModule, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ThrottlerModule } from '@nestjs/throttler';
import * as redisStore from 'cache-manager-redis-store';

import { CourseDeleteCommandHandler } from './application/commands/course-delete.command';
import { CourseInsertCommandHandler } from './application/commands/course-insert.command';
import { CourseUpdateCommandHandler } from './application/commands/course-update.command';
import { CourseApplication } from './application/course.application';
import { CourseCreateHandler } from './application/events/CourseCreateHandler';
import { CourseDeletedHandler } from './application/events/CourseDeletedHandler';
import {
  CourseFindAllQueryHandler,
  CourseFindOneQueryHandler,
} from './application/queries/course-find-all.query';
import { CourseFactory } from './domain/aggregates/course.factory';
import { CourseInfrastructure } from './infrastructure/course.infrastructure';
import { CourseController } from './interfaces/course.controller';

const application = [
  CourseApplication,
  CourseInsertCommandHandler,
  CourseUpdateCommandHandler,
  CourseFindAllQueryHandler,
  CourseDeleteCommandHandler,
  CourseFindOneQueryHandler,
  CourseCreateHandler,
  CourseDeletedHandler,
];
const infrastructure = [CourseInfrastructure];
const controllers = [CourseController];
const domains = [CourseFactory];

const imports = [
  CqrsModule,
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
];

@Module({
  imports: [...imports],
  controllers: [...controllers],
  providers: [...application, ...infrastructure, ...domains],
})
export class CourseModule {}
