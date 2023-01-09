import { Course } from '../aggregates/course';

export interface CourseRepository {
  insert(course: Course): Promise<Course>;
}
