import { BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { Inject } from '@nestjs/common/decorators';
import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs';
import { v4 as uuidv4 } from 'uuid';

import { CourseProperties } from '../../domain/aggregates/course';
import { CourseFactory } from '../../domain/aggregates/course.factory';
import { Goal } from '../../domain/entities';
import { CourseRepository } from '../../domain/repositories/course.repository';
import { IdVO } from '../../domain/value-objects/id.vo';
import { CourseInfrastructure } from '../../infrastructure/course.infrastructure';

export class CourseInsertCommand implements ICommand {
  constructor(
    readonly name: string,
    readonly goals?: string[],
    readonly requeriments?: string[],
    readonly syllabus?: string[],
  ) {}
}

@CommandHandler(CourseInsertCommand)
export class CourseInsertCommandHandler
  implements ICommandHandler<CourseInsertCommand>
{
  constructor(
    @Inject(CourseInfrastructure)
    private readonly courseRepository: CourseRepository,
    private readonly courseFactory: CourseFactory,
  ) {}

  async execute(command: CourseInsertCommand): Promise<any> {
    const idVOResult = IdVO.create(uuidv4());

    if (idVOResult.isErr()) {
      throw new BadRequestException(idVOResult.error.message);
    }

    const properties: CourseProperties = {
      id: idVOResult.value,
      name: command.name,
      goals: command.goals.map((goal) => new Goal(goal)),
    };

    const courseResult = this.courseFactory.create(properties);

    if (courseResult.isErr()) {
      throw new BadRequestException(courseResult.error.message);
    }

    const courseInsertResult = await this.courseRepository.save(
      courseResult.value,
    );

    if (courseInsertResult.isErr()) {
      throw new InternalServerErrorException(courseInsertResult.error.message);
    }

    courseResult.value.commit();

    return courseInsertResult.value;
  }
}
