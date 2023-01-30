import { Injectable } from '@nestjs/common';

import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async validateUser(username: string, password: string) {
    const userFound = await this.userService.findOne(username);
    if (userFound && userFound.password === password) {
      const { password, ...response } = userFound;

      return response;
    }
  }
}
