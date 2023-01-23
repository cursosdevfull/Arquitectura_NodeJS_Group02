import { BadRequestException, Inject, InternalServerErrorException } from '@nestjs/common';
import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs';

import { CourseRepository } from '../../domain/repositories/course.repository';
import { CourseInfrastructure } from '../../infrastructure/course.infrastructure';

export class CourseDeleteCommand implements ICommand {
  constructor(readonly id: string) {}
}

@CommandHandler(CourseDeleteCommand)
export class CourseDeleteCommandHandler
  implements ICommandHandler<CourseDeleteCommand>
{
  constructor(
    @Inject(CourseInfrastructure)
    private readonly courseRepository: CourseRepository,
  ) {}

  async execute(command: CourseDeleteCommand): Promise<any> {
    const courseResult = await this.courseRepository.findById(command.id);

    if (courseResult.isErr()) {
      throw new BadRequestException(courseResult.error.message);
    }

    const course = courseResult.value;
    course.delete();

    const courseDeleteResult = await this.courseRepository.save(
      courseResult.value,
    );

    if (courseDeleteResult.isErr()) {
      throw new InternalServerErrorException(courseDeleteResult.error.message);
    }

    return courseDeleteResult.value;
  }
}
