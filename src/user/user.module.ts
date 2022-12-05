import { Module } from '@nestjs/common';

import { UserApplication } from './application/user.application';
import { UserInfrastructure } from './infrastructure/user.infrastructure';
import { UserController } from './interfaces/http/user.controller';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserInfrastructure, UserApplication],
})
export class UserModule {}
