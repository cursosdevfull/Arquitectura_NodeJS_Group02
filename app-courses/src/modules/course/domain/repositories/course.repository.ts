import { CourseFindAllResult, CourseFindOneResult, CourseInsertResult } from '../../infrastructure/course.infrastructure';
import { Course } from '../aggregates/course';

export interface CourseRepository {
  insert(course: Course): Promise<CourseInsertResult>;
  findAll(): Promise<CourseFindAllResult>;
  findOne(id: string): Promise<CourseFindOneResult>;
}
