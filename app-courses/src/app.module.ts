import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';

import { AppService } from './app.service';
import { CourseModule } from './modules/course/course.module';

const controllers = [];
const imports = [CqrsModule, CourseModule, ConfigModule.forRoot()];
@Module({
  imports: [...imports],
  controllers: [...controllers],
  providers: [AppService],
})
export class AppModule {}
