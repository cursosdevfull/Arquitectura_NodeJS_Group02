import { CourseFindAllResultDto } from '../../application/dtos/course-find-all-result.dto';
import { Course } from '../../domain/aggregates/course';
import { Goal, Requeriment, Syllabus } from '../../domain/entities';
import { IdVO } from '../../domain/value-objects/id.vo';
import { CourseEntity } from '../entities/course';
import { GoalEntity } from '../entities/goal';
import { RequerimentEntity } from '../entities/requeriment';
import { SyllabusEntity } from '../entities/syllabus';

export class CourseDto {
  static fromDomainToData(course: Course): CourseEntity {
    const courseEntity = new CourseEntity();
    courseEntity.id = course.properties().id.getValue();
    courseEntity.name = course.properties().name;
    courseEntity.active = course.properties().active;
    courseEntity.goals = course.properties().goals?.map((goal) => {
      const goalEntity = new GoalEntity();
      goalEntity.id = goal.id.getValue();
      goalEntity.description = goal.description;
      goalEntity.active = goal.active;
      goalEntity.course = courseEntity;
      return goalEntity;
    });
    courseEntity.requeriments = course
      .properties()
      .requeriments?.map((requeriment) => {
        const requerimentEntity = new RequerimentEntity();
        requerimentEntity.id = requeriment.id.getValue();
        requerimentEntity.description = requeriment.description;
        requerimentEntity.active = requeriment.active;
        requerimentEntity.course = courseEntity;
        return requerimentEntity;
      });
    courseEntity.syllabus = course.properties().syllabus?.map((syllabus) => {
      const syllabusEntity = new SyllabusEntity();
      syllabusEntity.id = syllabus.id.getValue();
      syllabusEntity.description = syllabus.description;
      syllabusEntity.active = syllabus.active;
      syllabusEntity.course = courseEntity;
      return syllabusEntity;
    });
    courseEntity.createdAt = course.properties().createdAt;
    courseEntity.updatedAt = course.properties().updatedAt;
    courseEntity.deletedAt = course.properties().deletedAt;
    return courseEntity;
  }

  static fromDataToApplication(
    coursesEntity: CourseEntity | CourseEntity[],
  ): CourseFindAllResultDto | CourseFindAllResultDto[] {
    if (!Array.isArray(coursesEntity)) {
      const courseFindAllResultDto = new CourseFindAllResultDto();
      courseFindAllResultDto.id = coursesEntity.id;
      courseFindAllResultDto.name = coursesEntity.name;
      courseFindAllResultDto.goals = coursesEntity.goals?.map((goalEntity) => {
        return goalEntity.description;
      });
      courseFindAllResultDto.requeriments = coursesEntity.requeriments?.map(
        (requerimentEntity) => {
          return requerimentEntity.description;
        },
      );
      courseFindAllResultDto.syllabus = coursesEntity.syllabus?.map(
        (syllabusEntity) => {
          return syllabusEntity.description;
        },
      );
      return courseFindAllResultDto;
    } else {
      return coursesEntity.map((courseEntity) => {
        const courseFindAllResultDto = new CourseFindAllResultDto();
        courseFindAllResultDto.id = courseEntity.id;
        courseFindAllResultDto.name = courseEntity.name;
        courseFindAllResultDto.goals = courseEntity.goals?.map((goalEntity) => {
          return goalEntity.description;
        });
        courseFindAllResultDto.requeriments = courseEntity.requeriments?.map(
          (requerimentEntity) => {
            return requerimentEntity.description;
          },
        );
        courseFindAllResultDto.syllabus = courseEntity.syllabus?.map(
          (syllabusEntity) => {
            return syllabusEntity.description;
          },
        );
        return courseFindAllResultDto;
      });
    }
  }

  static fromDataToDomain(courseEntity: CourseEntity): Course {
    const idVOResult = IdVO.create(courseEntity.id);
    if (idVOResult.isErr()) throw new Error(idVOResult.error.message);

    const course = new Course({
      id: idVOResult.value,
      name: courseEntity.name,
      active: courseEntity.active,
      goals: courseEntity.goals?.map((goalEntity) => {
        return new Goal(goalEntity.description);
        /* const idVOResult = IdVO.create(goalEntity.id);
        if (idVOResult.isErr()) throw new Error(idVOResult.error.message);

        return {
          id: idVOResult.value,
          description: goalEntity.description,
          active: goalEntity.active,
        }; */
      }),
      requeriments: courseEntity.requeriments?.map((requerimentEntity) => {
        /* const idVOResult = IdVO.create(requerimentEntity.id);
        if (idVOResult.isErr()) throw new Error(idVOResult.error.message); */

        return new Requeriment(requerimentEntity.description);

        /* return {
          id: idVOResult.value.getValue(),
          description: requerimentEntity.description,
          active: requerimentEntity.active,
        }; */
      }),
      syllabus: courseEntity.syllabus?.map((syllabusEntity) => {
        return new Syllabus(syllabusEntity.description);
        /*   const idVOResult = IdVO.create(syllabusEntity.id);
        if (idVOResult.isErr()) throw new Error(idVOResult.error.message);

        return {
          id: idVOResult.value,
          description: syllabusEntity.description,
          active: syllabusEntity.active,
        }; */
      }),
      createdAt: courseEntity.createdAt,
      updatedAt: courseEntity.updatedAt,
      deletedAt: courseEntity.deletedAt,
    });
    return course;
  }
}
