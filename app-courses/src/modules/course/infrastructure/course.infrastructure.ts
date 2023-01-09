import { Injectable } from '@nestjs/common';

import { Course } from '../domain/aggregates/course';
import { CourseRepository } from '../domain/repositories/course.repository';

@Injectable()
export class CourseInfrastructure implements CourseRepository {
  insert(course: Course): Promise<Course> {
    return Promise.resolve(course);
  }
}
