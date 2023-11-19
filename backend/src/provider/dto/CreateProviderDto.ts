import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  isArray,
} from 'class-validator';
import { type } from 'os';

export class CreateProviderDto {
  @IsString()
  @ApiProperty()
  accountNumber;

  @IsString()
  @ApiProperty()
  abridgment;

  @IsNumber()
  @ApiProperty()
  commonAccountNumber;

  @IsString()
  @ApiProperty()
  address;

  @IsOptional()
  @IsString()
  @ApiProperty()
  complementAdress;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  postalCode;

  @IsString({
    each: true,
  })
  @ApiProperty()
  city;

  @IsString()
  @ApiProperty()
  country;

  @IsArray()
  @ApiProperty({
    isArray: true,
    type: String,
  })
  telephone;

  @IsOptional()
  @IsString()
  @ApiProperty()
  telecopie;

  @IsOptional()
  @IsString()
  @ApiProperty()
  email;

  @IsOptional()
  @IsString()
  @ApiProperty()
  contactName;

  @IsOptional()
  @IsString()
  @ApiProperty()
  rc;
  @IsString()
  @ApiProperty()
  stat;

  @IsOptional()
  @IsString()
  @ApiProperty()
  nif;

  @IsOptional()
  @IsString()
  @ApiProperty()
  cif;

  @IsString()
  @ApiProperty()
  collector;

  @IsString()
  @ApiProperty()
  name;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  min;
}
