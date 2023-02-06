import {
  Body,
  CACHE_MANAGER,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Res } from '@nestjs/common/decorators';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiProperty } from '@nestjs/swagger';
import { ApiOperation, ApiTags } from '@nestjs/swagger/dist';
import {
  ApiBadRequestResponse,
  ApiResponse,
} from '@nestjs/swagger/dist/decorators';
import { Throttle } from '@nestjs/throttler';
import { Cache } from 'cache-manager';

import { AuthenticationGuard } from '../../../core/guards/authentication/authentication.guard';
import { CacheInterceptor } from '../../../core/interceptors/cache/cache.interceptor';
import { CourseDeleteCommand } from '../application/commands/course-delete.command';
import { CourseInsertCommand } from '../application/commands/course-insert.command';
import { CourseUpdateCommand } from '../application/commands/course-update.command';
import {
  CourseFindAllQuery,
  CourseFindOneQuery,
} from '../application/queries/course-find-all.query';
import { CourseDeleteDto } from './dtos/course-delete.dto';
import { CourseFindByIdDto } from './dtos/course-find-by-id.dto';
import { CourseInsertDto } from './dtos/course-insert.dto';
import { CourseUpdateDto, CourseUpdateIdDto } from './dtos/course-update.dto';

export class BadRequest {
  @ApiProperty({ type: 'number', example: 400 })
  statusCode: number;
  @ApiProperty({ type: 'string', isArray: true, example: ['Bad Request'] })
  message: string[];

  @ApiProperty({ type: 'string', example: 'Bad Request' })
  error: string;
}
export class ItemCourseDto {
  @ApiProperty({
    type: 'string',
    example: '8bb6a4cb-aa61-448a-8b5a-2ea94461a64d',
  })
  id: string;

  @ApiProperty({
    type: 'string',
    example: 'Sergio',
  })
  name: string;

  @ApiProperty({
    type: 'string',
    isArray: true,
    example: ['goal1', 'goal2'],
  })
  goals: string[];

  @ApiProperty({
    type: 'string',
    isArray: true,
    example: ['requeriment1', 'requeriment2'],
  })
  requeriments: string[];

  @ApiProperty({
    type: 'string',
    isArray: true,
    example: ['syllabus1', 'syllabus2'],
  })
  syllabus: string[];
}

@Controller('course')
@ApiTags('Course')
export class CourseController {
  //constructor(private readonly courseApplication: CourseApplication) {}
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
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
  @Throttle(3, 60)
  @UseInterceptors(CacheInterceptor)
  @UseGuards(AuthenticationGuard)
  @ApiOperation({ summary: 'Get all courses' })
  async findAll(@Res({ passthrough: true }) res: any) {
    console.log('CourseController.findAll()');
    const courseQuery = new CourseFindAllQuery();
    const courses = await this.queryBus.execute(courseQuery);

    if (courses && courses.length > 0) {
      await this.cacheManager.set(res.locals.cacheKey, courses);
    }

    console.log('Response from controller');
    return courses;
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get course by id' })
  @ApiResponse({
    status: 200,
    description: 'The course has been successfully found.',
    type: ItemCourseDto,
  })
  @ApiBadRequestResponse({
    type: BadRequest,
    description: "Param 'id' is not a valid UUID",
  })
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
