import { Inject, Injectable } from '@nestjs/common';

import { Course } from '../domain/aggregates/course';
import { CourseRepository } from '../domain/repositories/course.repository';
import { CourseInfrastructure } from '../infrastructure/course.infrastructure';

@Injectable()
export class CourseApplication {
  constructor(
    @Inject(CourseInfrastructure)
    private readonly courseRepository: CourseRepository,
  ) {}

  insert(course: Course): Promise<Course> {
    return this.courseRepository.insert(course);
  }
}
