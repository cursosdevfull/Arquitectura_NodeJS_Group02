import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport/dist';

import { UserModule } from '../user/user.module';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local-strategy';
import { AuthController } from './auth.controller';

@Module({
  providers: [AuthService, LocalStrategy],
  imports: [UserModule, PassportModule],
  controllers: [AuthController],
})
export class AuthModule {}
