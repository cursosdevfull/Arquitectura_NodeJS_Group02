import { BadRequestException, Inject, InternalServerErrorException } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommand, ICommandHandler } from '@nestjs/cqrs';

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
    @Inject(EventPublisher) private readonly eventPublisher: EventPublisher,
  ) {}

  async execute(command: CourseDeleteCommand): Promise<any> {
    const courseResult = await this.courseRepository.findById(command.id);

    if (courseResult.isErr()) {
      throw new BadRequestException(courseResult.error.message);
    }

    const course = courseResult.value;

    this.eventPublisher.mergeObjectContext(course);
    course.delete();
    course.commit();

    const courseDeleteResult = await this.courseRepository.save(
      courseResult.value,
    );

    if (courseDeleteResult.isErr()) {
      throw new InternalServerErrorException(courseDeleteResult.error.message);
    }

    return courseDeleteResult.value;
  }
}
