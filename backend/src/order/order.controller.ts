import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrdersDto } from './dto/CreateOrders.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('api/order')
@ApiTags('🛍️ Order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get('count')
  @ApiOperation({
    summary: 'Returns orders count',
  })
  getOrderCount() {
    return this.orderService.getOrderCount();
  }

  @Post()
  @ApiOperation({
    summary:
      'Create order records from a raw list fo medicine ID and quantity to order',
  })
  async createOrders(@Body() createOrdersDto: CreateOrdersDto) {
    await this.orderService.createOrders(createOrdersDto);
    return 'Orders created';
  }

  @Delete()
  @ApiOperation({ summary: 'Delete all orders' })
  clearOrders() {
    return this.orderService.clearOrders();
  }
}
