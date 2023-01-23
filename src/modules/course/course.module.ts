import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { CourseDeleteCommandHandler } from './application/commands/course-delete.command';
import { CourseInsertCommandHandler } from './application/commands/course-insert.command';
import { CourseUpdateCommandHandler } from './application/commands/course-update.command';
import { CourseApplication } from './application/course.application';
import { CourseFindAllQueryHandler, CourseFindOneQueryHandler } from './application/queries/course-find-all.query';
import { CourseInfrastructure } from './infrastructure/course.infrastructure';
import { CourseController } from './interfaces/course.controller';

const application = [
  CourseApplication,
  CourseInsertCommandHandler,
  CourseUpdateCommandHandler,
  CourseFindAllQueryHandler,
  CourseDeleteCommandHandler,
  CourseFindOneQueryHandler,
];
const infrastructure = [CourseInfrastructure];
const controllers = [CourseController];

const imports = [CqrsModule];

@Module({
  imports: [...imports],
  controllers: [...controllers],
  providers: [...application, ...infrastructure],
})
export class CourseModule {}
