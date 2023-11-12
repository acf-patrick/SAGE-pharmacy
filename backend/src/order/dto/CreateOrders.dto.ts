import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsUUID } from 'class-validator';

class Order {
  @ApiProperty()
  @IsUUID()
  medicineId: string;

  @ApiProperty()
  @IsNumber()
  quantityToOrder: number;
}

export class CreateOrdersDto {
  @ApiProperty({
    type: 'array',
  })
  @IsArray()
  orders: Order[];
}
