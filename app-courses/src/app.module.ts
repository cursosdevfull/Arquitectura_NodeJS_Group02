import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CourseModule } from './modules/course/course.module';

const controllers = [AppController];
const imports = [CqrsModule, CourseModule];
@Module({
  imports: [...imports],
  controllers: [...controllers],
  providers: [AppService],
})
export class AppModule {}
