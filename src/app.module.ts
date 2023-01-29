import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';

import { AppService } from './app.service';
import { CourseModule } from './modules/course/course.module';
import { HealthcheckController } from './healthcheck/healthcheck.controller';

const controllers = [];
const imports = [CqrsModule, CourseModule, ConfigModule.forRoot()];
@Module({
  imports: [...imports],
  controllers: [...controllers, HealthcheckController],
  providers: [AppService],
})
export class AppModule {}
