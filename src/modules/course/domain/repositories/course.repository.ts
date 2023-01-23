import {
  CourseFindAllResult,
  CourseFindByIdResult,
  CourseFindOneResult,
  CourseInsertResult,
} from '../../infrastructure/course.infrastructure';
import { Course } from '../aggregates/course';

export interface CourseRepository {
  save(course: Course): Promise<CourseInsertResult>;
  findAll(): Promise<CourseFindAllResult>;
  findOne(id: string): Promise<CourseFindOneResult>;
  findById(id: string): Promise<CourseFindByIdResult>;
}
