import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CourseInsertDto {
  @IsNotEmpty()
  @IsString()
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
