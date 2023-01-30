import { IEvent } from '@nestjs/cqrs';

export class CourseCreated implements IEvent {
  readonly id: string;
  readonly name: string;
  readonly active: boolean;
  readonly goals: any[];
  readonly requeriments: any[];
  readonly syllabus: any[];
}
