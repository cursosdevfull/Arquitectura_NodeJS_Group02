import { UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

import { AuthService } from './auth.service';

export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(username: string, password: string) {
    console.log('validateUser', this.authService);
    const userFound = await this.authService.validateUser(username, password);
    if (userFound) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return userFound;
  }
}
