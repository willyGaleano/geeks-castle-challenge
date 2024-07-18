import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateCustomerDto {
  @ApiProperty({
    example: 'name test',
    description: 'The name of the customer',
    minLength: 6,
    maxLength: 25,
    required: true,
  })
  @IsOptional()
  @IsString()
  @MinLength(6)
  @MaxLength(25)
  name?: string;

  @ApiProperty({
    example: 'lastname test',
    description: 'The lastname of the customer',
    minLength: 6,
    maxLength: 25,
    required: true,
  })
  @IsOptional()
  @IsString()
  @MinLength(6)
  @MaxLength(25)
  lastname?: string;

  @ApiProperty({
    example: '2021-01-01',
    description: 'The birthday of the customer',
    required: true,
  })
  @IsOptional()
  @IsDateString()
  birthday?: string;
}
