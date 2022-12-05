import { Body, Controller, Get, Post } from '@nestjs/common';
import { User } from 'src/user/domain/entities/user';
import { v4 as uuidv4 } from 'uuid';

import { UserApplication } from '../../application/user.application';
import { UserInsertDto } from './dtos/user-insert.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userApplication: UserApplication) {}

  @Get()
  async getAll() {
    return await this.userApplication.getAll();
  }

  @Post()
  async insert(@Body() user: UserInsertDto) {
    console.log(user);
    const { name, email, username, password } = user;
    const id = uuidv4();
    const userEntity = new User(id, name, email, username, password);

    return await this.userApplication.add(userEntity);
  }
}
