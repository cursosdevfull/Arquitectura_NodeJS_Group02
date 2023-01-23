import { IsString, IsUUID } from 'class-validator';

export class CourseFindByIdDto {
  @IsString()
  @IsUUID()
  id: string;
}
