import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class OrderDto {
  @ApiProperty()
  @IsString()
  providerName: string;

  @ApiProperty()
  @IsNumber()
  minPurchase: number;

  @ApiProperty()
  @IsNumber()
  totalPriceWithTax: number;

  @ApiProperty()
  @IsNumber()
  totalPriceWithoutTax: number;
}
