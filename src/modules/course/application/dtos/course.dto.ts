import { Course, CourseProperties } from '../../domain/aggregates/course';
import { Goal, Requeriment, Syllabus } from '../../domain/entities';
import { IdVO } from '../../domain/value-objects/id.vo';
import { CourseUpdateCommand } from '../commands/course-update.command';

export class CourseDto {
  static fromApplicationToDomain(courseDto: CourseUpdateCommand): Course {
    const { id, name, goals, requeriments, syllabus } = courseDto;
    const idVOResult = IdVO.create(id);

    if (idVOResult.isErr()) {
      throw new Error('Invalid id');
    }

    const properties: CourseProperties = {
      id: idVOResult.value,
      name: name,
      goals: goals?.map((goal) => new Goal(goal)),
      requeriments: requeriments?.map(
        (requeriment) => new Requeriment(requeriment),
      ),
      syllabus: syllabus?.map((syllabus) => new Syllabus(syllabus)),
    };
    return new Course(properties);
  }
}
