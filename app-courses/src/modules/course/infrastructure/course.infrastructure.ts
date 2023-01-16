import { Injectable } from '@nestjs/common';
import { err, ok, Result } from 'neverthrow';

import { AppService } from '../../../app.service';
import { CourseFindAllResultDto } from '../application/dtos/course-find-all-result.dto';
import { Course } from '../domain/aggregates/course';
import { CourseRepository } from '../domain/repositories/course.repository';
import { CourseDto } from './dtos/course.dto';
import { CourseEntity } from './entities/course';
import { CourseDatabaseException } from './exceptions/course';

export type CourseInsertResult = Result<Course, CourseDatabaseException>;
export type CourseFindAllResult = Result<
  CourseFindAllResultDto[],
  CourseDatabaseException
>;

export type CourseFindOneResult = Result<
  CourseFindAllResultDto,
  CourseDatabaseException
>;

@Injectable()
export class CourseInfrastructure implements CourseRepository {
  async insert(course: Course): Promise<CourseInsertResult> {
    try {
      const manager = AppService.manager;
      const courseEntity = CourseDto.fromDomainToData(course);

      await manager.getRepository(CourseEntity).save(courseEntity);

      return ok(course);
    } catch (error) {
      return err(new CourseDatabaseException(error.message));
    }
  }

  async findAll(): Promise<CourseFindAllResult> {
    try {
      const manager = AppService.manager;
      const coursesEntity = await manager.getRepository(CourseEntity).find(
        {
          where: { active: true },
        } /* { relations: ['goals', 'requeriments', 'syllabus'] } */,
      );

      return ok(
        CourseDto.fromDataToApplication(
          coursesEntity,
        ) as CourseFindAllResultDto[],
      );
    } catch (error) {
      return err(new CourseDatabaseException(error.message));
    }
  }

  async findOne(id: string): Promise<CourseFindOneResult> {
    try {
      const manager = AppService.manager;
      const coursesEntity = await manager
        .getRepository(CourseEntity)
        .findOne({ where: { id, active: true } });

      return ok(
        CourseDto.fromDataToApplication(
          coursesEntity,
        ) as CourseFindAllResultDto,
      );
    } catch (error) {
      return err(new CourseDatabaseException(error.message));
    }
  }
}
