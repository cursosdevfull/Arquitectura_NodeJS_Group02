import { CommandBus, EventBus, EventPublisher } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { UserService } from '../../../user/user.service';
import { CourseFactory } from '../../domain/aggregates/course.factory';
import { CourseRepository } from '../../domain/repositories/course.repository';
import { CourseInfrastructure } from '../../infrastructure/course.infrastructure';
import {
  CourseInsertCommand,
  CourseInsertCommandHandler,
} from './course-insert.command';

//import mockCourseInserted from './mocks/course-insert.json';

const mockCourseInserted = {
  id: {
    value: '02c2671f-02cc-4d2f-96ea-8364122f1132',
  },
  name: 'Angular 17 Pro',
  goals: [
    {
      id: {
        value: '350ed5ff-ffba-43db-8608-2063b03aa5ea',
      },
      description: 'Aprender a desarrollar Angular de forma PRO',
      active: true,
    },
    {
      id: {
        value: '66c3746c-a996-43f9-a8c3-14f162b955a4',
      },
      description: 'Crear apps empresariales',
      active: true,
    },
    {
      id: {
        value: '9e43a64b-026e-4df9-a0b3-2eaecf28807b',
      },
      description: 'Crear con buenas prácticas',
      active: true,
    },
  ],
  active: true,
  createdAt: '2023-02-05T21:28:24.127Z',
};

describe('CourseInsertCommandHandler', () => {
  let courseInfrastructure: CourseRepository;
  let courseFactory: CourseFactory;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        CourseFactory,
        CourseInfrastructure,
        EventPublisher,
        EventBus,
        UserService,
        CommandBus,
      ],
    }).compile();

    courseFactory = module.get<CourseFactory>(CourseFactory);
    courseInfrastructure = module.get<CourseRepository>(CourseInfrastructure);
  });

  it('Insert a course', async () => {
    // Arrange
    const courseInsertCommand = new CourseInsertCommand(
      mockCourseInserted.name,
      mockCourseInserted.goals.map((el) => el.description),
    );

    // Act
    courseInfrastructure.save = jest.fn().mockResolvedValue({
      isErr: () => false,
      value: mockCourseInserted,
    });

    const courseInsertCommandHandler = new CourseInsertCommandHandler(
      courseInfrastructure,
      courseFactory,
    );

    const result = await courseInsertCommandHandler.execute(
      courseInsertCommand,
    );

    // Assert
    expect(result).toEqual(mockCourseInserted);
    expect(courseInfrastructure.save).toHaveBeenCalledTimes(1);
  });
});
