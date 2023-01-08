import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CourseController } from './modules/course/interfaces/course.controller';

const controllers = [AppController, CourseController];

@Module({
  imports: [],
  controllers: [...controllers],
  providers: [AppService],
})
export class AppModule {}
