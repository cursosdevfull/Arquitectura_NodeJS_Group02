import { Controller, Post } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { CourseProperties } from '../domain/aggregates/course';
import { CourseFactory } from '../domain/aggregates/couse.factory';
import { Goal } from '../domain/entities';
import { IdVO } from '../domain/value-objects/id.vo';

@Controller('course')
export class CourseController {
  @Post()
  create() {
    const properties: CourseProperties = {
      id: IdVO.create(uuidv4()),
      name: 'Infraestructura como código con Pulumi',
      goals: [
        new Goal(
          'Aprender a usar Pulumi para crear infraestructura como código',
        ),
        new Goal('Desplegar contínuamente con Pulumi'),
        new Goal(
          'Desarrollar infraestructura usando Programa Orientada a Objetos usando Typescript',
        ),
      ],
    };

    const course = CourseFactory.create(properties);

    return course;
  }
}
