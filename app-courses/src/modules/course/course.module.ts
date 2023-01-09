import { Module } from '@nestjs/common';

import { CourseApplication } from './application/course.application';
import { CourseInfrastructure } from './infrastructure/course.infrastructure';
import { CourseController } from './interfaces/course.controller';

const application = [CourseApplication];
const infrastructure = [CourseInfrastructure];
const controllers = [CourseController];

@Module({
  controllers: [...controllers],
  providers: [...application, ...infrastructure],
})
export class CourseModule {}
