import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';

import { AppService } from './app.service';
import { CourseModule } from './modules/course/course.module';
import { HealthcheckController } from './healthcheck/healthcheck.controller';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';

const controllers = [];
const imports = [CqrsModule, CourseModule, ConfigModule.forRoot()];
@Module({
  imports: [...imports, AuthModule, UserModule],
  controllers: [...controllers, HealthcheckController],
  providers: [AppService],
})
export class AppModule {}
