import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateCustomerDto {
  @ApiProperty({
    example: 'name test',
    description: 'The name of the customer',
    minLength: 6,
    maxLength: 25,
    required: true,
  })
  @IsString()
  @MinLength(6)
  @MaxLength(25)
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'lastname test',
    description: 'The lastname of the customer',
    minLength: 6,
    maxLength: 25,
    required: true,
  })
  @IsString()
  @MinLength(6)
  @MaxLength(25)
  @IsNotEmpty()
  lastname: string;

  @ApiProperty({
    example: '2021-01-01',
    description: 'The birthday of the customer',
    required: true,
  })
  @IsDateString()
  @IsNotEmpty()
  birthday: string;
}
