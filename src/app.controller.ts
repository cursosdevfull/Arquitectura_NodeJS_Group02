import { Controller, Get, Inject } from '@nestjs/common';

import { AppService } from './app.service';
import { USER_SERVICE_TOKEN } from './tokens';
import { UserService } from './user.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject(USER_SERVICE_TOKEN) private userService: UserService,
    @Inject('USER_INACTIVITY') private userInactivity: number,
    @Inject('CONFIG_SMTP') private configSmtp: any,
    @Inject('CONFIG_DB') private configDb: any,
    private readonly userService2: UserService,
  ) {}

  @Get()
  getHello(): string {
    //return this.appService.getHello();
    //return this.userService.getAll().join(',') + ' : ' + this.userInactivity;
    //return this.configSmtp.host + ' : ' + this.configSmtp.port;
    console.log(this.userService2.getAll());
    return this.configDb.connect();
  }
}
