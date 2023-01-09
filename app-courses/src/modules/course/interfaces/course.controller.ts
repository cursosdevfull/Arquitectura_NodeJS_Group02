import { Controller, Post } from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions';
import { v4 as uuidv4 } from 'uuid';

import { CourseApplication } from '../application/course.application';
import { CourseProperties } from '../domain/aggregates/course';
import { CourseFactory } from '../domain/aggregates/couse.factory';
import { Goal, Requeriment, Syllabus } from '../domain/entities';
import { IdVO } from '../domain/value-objects/id.vo';

@Controller('course')
export class CourseController {
  constructor(private readonly courseApplication: CourseApplication) {}

  @Post()
  async create() {
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
      requeriments: [
        new Requeriment('Conocimientos básicos de Typescript'),
        new Requeriment('Conocimientos básicos de Docker'),
        new Requeriment('Conocimientos básicos de AWS'),
      ],
      syllabus: [
        new Syllabus('Introducción a Pulumi'),
        new Syllabus('Instalación de Pulumi'),
        new Syllabus('Configuración de Pulumi'),
        new Syllabus('Despliegue de infraestructura con Pulumi'),
        new Syllabus('Despliegue de contenedores con Pulumi'),
      ],
    };

    const courseCreateResult = CourseFactory.create(properties);

    if (courseCreateResult.isErr()) {
      throw new HttpException(
        courseCreateResult.error.message,
        courseCreateResult.error.status,
      );
      /* throw new BadRequestException(
        courseCreateResult.error.message,
        courseCreateResult.error.name,
      ); */
    }

    return await this.courseApplication.insert(courseCreateResult.value);
  }
}
