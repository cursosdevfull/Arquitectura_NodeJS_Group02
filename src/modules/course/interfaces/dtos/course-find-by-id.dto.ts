import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';

export class CourseFindByIdDto {
  @ApiProperty({
    type: 'string',
    example: '8bb6a4cb-aa61-448a-8b5a-2ea94461a64d',
    description: "Course's id",
    required: true,
  })
  @IsString()
  @IsUUID()
  id: string;
}
