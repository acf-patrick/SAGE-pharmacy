import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ProviderModule } from 'src/provider/provider.module';

@Module({
  controllers: [OrderController],
  providers: [OrderService],
  imports: [PrismaModule, ProviderModule],
  exports: [OrderService],
})
export class OrderModule {
  constructor(private orderService: OrderService) {}
}
