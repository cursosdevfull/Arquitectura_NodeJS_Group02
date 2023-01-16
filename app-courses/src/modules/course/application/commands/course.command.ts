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

export class CourseCommand implements ICommand {
  constructor(
    readonly name: string,
    readonly goals?: string[],
    readonly requeriments?: string[],
    readonly syllabus?: string[],
  ) {}
}

@CommandHandler(CourseCommand)
export class CourseCommandHandler implements ICommandHandler<CourseCommand> {
  constructor(
    @Inject(CourseInfrastructure)
    private readonly courseRepository: CourseRepository,
  ) {}

  async execute(command: CourseCommand): Promise<any> {
    const properties: CourseProperties = {
      id: IdVO.create(uuidv4()),
      name: command.name,
      goals: command.goals.map((goal) => new Goal(goal)),
    };

    const courseResult = CourseFactory.create(properties);

    if (courseResult.isErr()) {
      throw new BadRequestException(courseResult.error.message);
    }

    const courseInsertResult = await this.courseRepository.insert(
      courseResult.value,
    );

    if (courseInsertResult.isErr()) {
      throw new InternalServerErrorException(courseInsertResult.error.message);
    }

    return courseInsertResult.value;
  }
}
