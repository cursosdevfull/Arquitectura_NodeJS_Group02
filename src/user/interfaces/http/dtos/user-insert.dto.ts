import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class UserInsertDto {
  @IsNotEmpty()
  @MinLength(3)
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;
}
