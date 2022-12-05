import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { USER_SERVICE_TOKEN } from './tokens';
import { UserService } from './user.service';
import { UserModule } from './user/user.module';

export class Database {
  getHost() {
    return 'localhost';
  }

  getPort() {
    return 27017;
  }

  connect() {
    return 'Connected to database MySQL';
  }
}

export class DatabaseOracle {
  getHost() {
    return 'localhost';
  }

  getPort() {
    return 27017;
  }

  connect() {
    return 'Connected to database Oracle';
  }
}

@Module({
  imports: [UserModule],
  controllers: [AppController],
  providers: [
    //{ provide: UserInfrastructure, useClass: UserInfrastructure },
    AppService,
    //{ provide: UserService, useClass: UserService },
    UserService,
    { provide: USER_SERVICE_TOKEN, useClass: UserService },
    { provide: 'USER_INACTIVITY', useValue: 1000 },
    {
      provide: 'CONFIG_SMTP',
      useValue: { host: 'smtp.gmail.com', port: 587, user: 'shidalgo' },
    },
    { provide: 'DATABASE_TYPE', useValue: 'oracle' },
    {
      provide: 'CONFIG_DB',
      useFactory: (databaseType) => {
        if (databaseType === 'mysql') {
          return new Database();
        } else if (databaseType === 'oracle') {
          return new DatabaseOracle();
        }
      },
      inject: ['DATABASE_TYPE'],
    },
  ],
})
export class AppModule {}
