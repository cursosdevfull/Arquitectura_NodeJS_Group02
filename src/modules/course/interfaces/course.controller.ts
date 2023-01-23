import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { CourseDeleteCommand } from '../application/commands/course-delete.command';
import { CourseInsertCommand } from '../application/commands/course-insert.command';
import { CourseUpdateCommand } from '../application/commands/course-update.command';
import { CourseFindAllQuery, CourseFindOneQuery } from '../application/queries/course-find-all.query';
import { CourseDeleteDto } from './dtos/course-delete.dto';
import { CourseFindByIdDto } from './dtos/course-find-by-id.dto';
import { CourseInsertDto } from './dtos/course-insert.dto';
import { CourseUpdateDto, CourseUpdateIdDto } from './dtos/course-update.dto';

@Controller('course')
export class CourseController {
  //constructor(private readonly courseApplication: CourseApplication) {}
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  async create(@Body() body: CourseInsertDto) {
    const courseInsertCommand = new CourseInsertCommand(
      body.name,
      body.goals,
      body.requeriments,
      body.syllabus,
    );

    const courseInserted = await this.commandBus.execute(courseInsertCommand);

    return courseInserted;
  }

  @Get()
  async findAll() {
    const courseQuery = new CourseFindAllQuery();
    const courses = await this.queryBus.execute(courseQuery);

    return courses;
  }

  @Get('/:id')
  async findOne(@Param() params: CourseFindByIdDto) {
    const courseQuery = new CourseFindOneQuery(params.id);
    const course = await this.queryBus.execute(courseQuery);

    return course;
  }

  @Put('/:id')
  async update(
    @Param() params: CourseUpdateIdDto,
    @Body() body: CourseUpdateDto,
  ) {
    const command = new CourseUpdateCommand(
      params.id,
      body.name,
      body.goals,
      body.requeriments,
      body.syllabus,
    );

    const course = await this.commandBus.execute(command);

    return course;
  }

  @Delete('/:id')
  async delete(@Param() params: CourseDeleteDto) {
    const command = new CourseDeleteCommand(params.id);

    const course = await this.commandBus.execute(command);

    return course;
  }
}
