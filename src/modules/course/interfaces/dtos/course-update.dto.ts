import { IsArray, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CourseUpdateIdDto {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  id: string;
}

export class CourseUpdateDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsArray()
  @IsOptional()
  //@ArrayMinSize(3)
  goals: string[];

  @IsArray()
  @IsOptional()
  requeriments: string[];

  @IsArray()
  @IsOptional()
  syllabus: string[];
}
