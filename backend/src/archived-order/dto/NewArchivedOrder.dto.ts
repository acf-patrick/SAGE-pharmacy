import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsDate, IsDateString, IsString } from 'class-validator';

export class NewArchivedOrderDto {
  @ApiProperty()
  @IsDateString()
  createdAt: Date;

  @ApiProperty()
  @IsString()
  providerName: string;

  @ApiProperty()
  @IsDateString()
  orderCreationDate: Date;

  @ApiProperty()
  @IsArray()
  evidences: string[];
}
