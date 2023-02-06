import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CourseCreated } from 'src/modules/course/domain/events/CourseCreated';

@EventsHandler(CourseCreated)
export class CourseCreateSupportHandler
  implements IEventHandler<CourseCreated>
{
  constructor() {
    console.log('CourseCreateHandler');
  }

  handle(event: CourseCreated) {
    console.log('CourseCreateSupportHandler');
    console.log('Sending sms with course created');
    console.log(event);
  }
}
