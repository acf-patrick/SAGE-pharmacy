import { ApiProperty } from '@nestjs/swagger';
import { Evidence } from '@prisma/client';
import { IsArray, IsDate, IsDateString, IsString } from 'class-validator';

export class NewArchivedOrderDto {
  @ApiProperty()
  @IsString()
  providerId: string;

  @ApiProperty()
  @IsArray()
  evidences: Evidence[];
}
