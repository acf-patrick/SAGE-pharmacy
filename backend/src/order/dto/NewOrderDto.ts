import { ApiProperty } from '@nestjs/swagger';
import { MedicineFromProvider, OrderStatus } from '@prisma/client';
import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsNumber,
  IsString,
} from 'class-validator';

export class NewOrderDto {
  @ApiProperty()
  @IsDateString()
  createdAt: Date;

  @ApiProperty()
  @IsString()
  status: OrderStatus;

  @ApiProperty()
  @IsString()
  providerName: string;

  @ApiProperty()
  @IsString()
  provider: string;

  @ApiProperty()
  @IsBoolean()
  isValid: boolean;

  @ApiProperty()
  @IsArray()
  orderMedicines: MedicineFromProvider[];
}
