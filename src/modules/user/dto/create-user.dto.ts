import { IsEmail, IsString, IsDate } from 'class-validator';

export class CreateUserDto {
  @IsString()
  username: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsDate()
  birthDate: Date;

  @IsString()
  password: string;
}
