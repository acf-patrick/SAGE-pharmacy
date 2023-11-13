import { ApiProperty } from '@nestjs/swagger';
import { OrderStatus } from '@prisma/client';
import { IsEnum, IsString } from 'class-validator';

export class SetStatusDto {
  @ApiProperty({
    enum: OrderStatus,
  })
  @IsString()
  status: OrderStatus;
}
