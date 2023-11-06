import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDateString, IsNumber, IsString } from 'class-validator';

export class CreateMedicineDto {
  @IsString()
  @ApiProperty()
  name: string;

  @IsString()
  @ApiProperty()
  location: string;

  @IsString()
  @ApiProperty()
  dci: string;

  @IsNumber()
  @ApiProperty()
  costPrice: number;

  @IsNumber()
  @ApiProperty()
  sellingPrice: number;

  @IsNumber()
  @ApiProperty()
  quantity: number;

  @IsNumber()
  @ApiProperty()
  min: number;

  @IsNumber()
  @ApiProperty()
  max: number;

  @IsBoolean()
  @ApiProperty()
  isTaxed: boolean;

  @IsDateString()
  @ApiProperty()
  expirationDate: Date;
}
