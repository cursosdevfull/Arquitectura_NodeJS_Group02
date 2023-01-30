import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { CourseCreated } from '../../domain/events/CourseCreated';

@EventsHandler(CourseCreated)
export class CourseCreateHandler implements IEventHandler<CourseCreated> {
  constructor() {
    console.log('CourseCreateHandler');
  }
  handle(event: CourseCreated) {
    console.log(event);
  }
}
