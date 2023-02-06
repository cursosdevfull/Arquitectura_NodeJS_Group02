import { Module } from '@nestjs/common';

import { CourseCreateSupportHandler } from './application/events/CourseCreated';

const domainEvents = [CourseCreateSupportHandler];

@Module({
  providers: [...domainEvents],
})
export class SupportModule {}
