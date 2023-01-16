import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { CourseCommandHandler } from './application/commands/course.command';
import { CourseApplication } from './application/course.application';
import { CourseFindAllQueryHandler } from './application/queries/course-find-all.query';
import { CourseInfrastructure } from './infrastructure/course.infrastructure';
import { CourseController } from './interfaces/course.controller';

const application = [
  CourseApplication,
  CourseCommandHandler,
  CourseFindAllQueryHandler,
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
