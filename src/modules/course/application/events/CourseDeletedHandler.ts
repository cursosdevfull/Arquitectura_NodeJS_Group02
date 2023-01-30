import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { CourseDeleted } from '../../domain/events/CourseDeleted';

@EventsHandler(CourseDeleted)
export class CourseDeletedHandler implements IEventHandler<CourseDeleted> {
  constructor() {
    console.log('CourseDeletedeHandler');
  }
  handle(event: CourseDeleted) {
    console.log(event);
  }
}
