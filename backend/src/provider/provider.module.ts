import { Module } from '@nestjs/common';
import { ProviderService } from './provider.service';
import { ProviderController } from './provider.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { StockModule } from '../stock/stock.module';

@Module({
  controllers: [ProviderController],
  providers: [ProviderService],
  imports: [PrismaModule, StockModule],
})
export class ProviderModule {}
