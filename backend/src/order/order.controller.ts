import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { OrderStatus } from '@prisma/client';
import { AccessTokenGuard } from 'src/auth/guards/access-token.guard';
import { PrismaService } from 'src/prisma/prisma.service';
import { AllOrders } from './dto/AllOrders.dto';
import { CreateOrdersDto } from './dto/CreateOrders.dto';
import { SetStatusDto } from './dto/SetStatus.dto';
import { OrderService } from './order.service';

@Controller('api/order')
@ApiTags('🛍️ Order')
@UseGuards(new AccessTokenGuard())
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private prisma: PrismaService,
  ) {}

  @Patch(':id')
  async setOrderStatus(
    @Param('id') id: string,
    @Body() { status }: SetStatusDto,
  ) {
    if (
      ![
        OrderStatus.ORDERED,
        OrderStatus.PENDING,
        OrderStatus.RECEIVED,
        OrderStatus.FINISHED,
      ].includes(status)
    ) {
      throw new BadRequestException('Invalid status value provided');
    }

    const order = await this.prisma.order.findUnique({
      where: { id },
    });
    if (!order) {
      throw new NotFoundException('Order not found');
    }

    if (order.status === 'ORDERED' && status !== 'ORDERED' && !order.isValid) {
      throw new BadRequestException(
        `Trying to update ORDERED order with invalid status`,
      );
    }

    if (
      (status === 'FINISHED' && order.status !== 'RECEIVED') ||
      (status === 'RECEIVED' && order.status !== 'PENDING') ||
      (status === 'PENDING' && order.status !== 'ORDERED')
    ) {
      throw new BadRequestException(
        `Invalid status provided. Order has status : ${order.status}`,
      );
    }

    await this.orderService.setOrderStatus(id, status);
    return `${id} status updated to ${status}`;
  }

  @Get()
  @ApiOperation({ summary: 'Returns all orders' })
  @ApiOkResponse({ type: AllOrders })
  getOrders() {
    return this.orderService.getAllOrders();
  }

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
