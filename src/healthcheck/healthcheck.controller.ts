import { Controller, Get } from '@nestjs/common';

@Controller()
export class HealthcheckController {
  @Get('healthcheck')
  healthcheck() {
    return 'OK';
  }

  @Get()
  root() {
    return 'Hello World!';
  }
}
