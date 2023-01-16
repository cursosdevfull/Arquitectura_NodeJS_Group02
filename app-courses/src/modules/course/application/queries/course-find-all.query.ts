import { Inject, InternalServerErrorException } from '@nestjs/common';
import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { CourseRepository } from '../../domain/repositories/course.repository';
import { IdVO } from '../../domain/value-objects/id.vo';
import { CourseInfrastructure } from '../../infrastructure/course.infrastructure';

export class CourseFindAllQuery implements IQuery {}
export class CourseFindOneQuery implements IQuery {
  id: string;
}

@QueryHandler(CourseFindAllQuery)
export class CourseFindAllQueryHandler
  implements IQueryHandler<CourseFindAllQuery>
{
  constructor(
    @Inject(CourseInfrastructure)
    private readonly courseRepository: CourseRepository,
  ) {}

  async execute(query: CourseFindAllQuery): Promise<any> {
    const courseFindAllResult = await this.courseRepository.findAll();

    if (courseFindAllResult.isErr()) {
      throw new InternalServerErrorException(courseFindAllResult.error.message);
    }

    return courseFindAllResult.value;
  }
}

@QueryHandler(CourseFindOneQuery)
export class CourseFindOneQueryHandler
  implements IQueryHandler<CourseFindOneQuery>
{
  constructor(
    @Inject(CourseInfrastructure)
    private readonly courseRepository: CourseRepository,
  ) {}

  async execute(query: CourseFindOneQuery) {
    IdVO.create(query.id);
  }
}
