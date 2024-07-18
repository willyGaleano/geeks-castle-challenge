import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'username',
    description: 'The username of the user',
    minLength: 6,
    maxLength: 25,
    required: true,
  })
  @IsString()
  @MinLength(6)
  @MaxLength(25)
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    example: 'example@gmail.com',
    description: 'The email of the user',
    minLength: 6,
    maxLength: 50,
    required: true,
  })
  @IsEmail()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(50)
  email: string;

  @ApiProperty({
    example: 'password',
    description: 'The password of the user',
    minLength: 6,
    maxLength: 50,
    required: false,
  })
  @IsOptional()
  @IsString()
  @MinLength(6)
  @MaxLength(50)
  password?: string;
}
