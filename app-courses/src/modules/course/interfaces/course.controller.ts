import { Body, Controller, Get, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { CourseCommand } from '../application/commands/course.command';
import { CourseFindAllQuery } from '../application/queries/course-find-all.query';
import { CourseInsertDto } from './dtos/course-insert.dto';

@Controller('course')
export class CourseController {
  //constructor(private readonly courseApplication: CourseApplication) {}
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  async create(@Body() body: CourseInsertDto) {
    const courseCommand = new CourseCommand(
      body.name,
      body.goals,
      body.requeriments,
      body.syllabus,
    );

    /* const courseCommand = new CourseCommand('NodeJS Profesional v19', [
      'Aprender a usar Pulumi para crear infraestructura como código',
      'Desplegar contínuamente con Pulumi',
      'Desarrollar infraestructura usando Programa Orientada a Objetos usando Typescript',
    ]); */

    const courseInserted = await this.commandBus.execute(courseCommand);

    return courseInserted;

    /*  const properties: CourseProperties = {
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
    //}

    //return await this.courseApplication.insert(courseCreateResult.value); */
  }

  @Get()
  async findAll() {
    const courseQuery = new CourseFindAllQuery();
    const courses = await this.queryBus.execute(courseQuery);

    return courses;
  }
}
