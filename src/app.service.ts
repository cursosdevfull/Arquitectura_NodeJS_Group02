import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager } from 'typeorm';

import { CourseEntity } from './modules/course/infrastructure/entities/course';
import { GoalEntity } from './modules/course/infrastructure/entities/goal';
import { RequerimentEntity } from './modules/course/infrastructure/entities/requeriment';
import { SyllabusEntity } from './modules/course/infrastructure/entities/syllabus';

export type IDatabase = {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  synchronize: boolean;
  logging: boolean;
};

let manager: EntityManager;

@Injectable()
export class AppService {
  private dataSource: DataSource | void;

  static get PORT() {
    return process.env.PORT || 4000;
  }

  get Entities() {
    return [CourseEntity, GoalEntity, RequerimentEntity, SyllabusEntity];
  }

  get ConnectionParamters(): IDatabase {
    const logging = false;
    const synchronize = true; //process.env.NODE_ENV !== 'production' ? true : false;
    return {
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      synchronize,
      logging,
    };
  }

  async onModuleInit() {
    const connectionParameters = this.ConnectionParamters;
    console.log('connectionParameters', connectionParameters);
    const entities = this.Entities;

    this.dataSource = await new DataSource({
      type: 'mysql',
      ...connectionParameters,
      entities,
    })
      .initialize()
      .catch((error) => {
        console.log(error);
        process.exit(1);
      });

    manager = this.dataSource.manager;
  }

  static get manager() {
    return manager;
  }
}
