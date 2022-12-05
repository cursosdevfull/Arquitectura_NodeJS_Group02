import { Controller, Get } from '@nestjs/common';

import { UserApplication } from '../../application/user.application';

@Controller('user')
export class UserController {
  constructor(private readonly userApplication: UserApplication) {}

  @Get()
  async getAll() {
    return await this.userApplication.getAll();
  }
}
