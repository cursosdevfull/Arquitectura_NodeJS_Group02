import { BadRequestException, Inject, InternalServerErrorException } from '@nestjs/common';
import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs';

import { CourseRepository } from '../../domain/repositories/course.repository';
import { CourseInfrastructure } from '../../infrastructure/course.infrastructure';
import { CourseDto } from '../dtos/course.dto';

export class CourseUpdateCommand implements ICommand {
  constructor(
    readonly id: string,
    readonly name?: string,
    readonly goals?: string[],
    readonly requeriments?: string[],
    readonly syllabus?: string[],
  ) {}
}

@CommandHandler(CourseUpdateCommand)
export class CourseUpdateCommandHandler
  implements ICommandHandler<CourseUpdateCommand>
{
  constructor(
    @Inject(CourseInfrastructure)
    private readonly courseRepository: CourseRepository,
  ) {}

  async execute(command: CourseUpdateCommand): Promise<any> {
    const courseResult = await this.courseRepository.findById(command.id);

    if (courseResult.isErr()) {
      throw new BadRequestException(courseResult.error.message);
    }

    const course = courseResult.value;
    course.update(CourseDto.fromApplicationToDomain(command).properties());

    const courseInsertResult = await this.courseRepository.save(
      courseResult.value,
    );

    if (courseInsertResult.isErr()) {
      throw new InternalServerErrorException(courseInsertResult.error.message);
    }

    return courseInsertResult.value;
  }
}
