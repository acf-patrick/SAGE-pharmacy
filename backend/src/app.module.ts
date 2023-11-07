import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { StockModule } from './stock/stock.module';
import { ConfigModule } from '@nestjs/config';
import { ProviderModule } from './provider/provider.module';

@Module({
  imports: [PrismaModule, StockModule, ConfigModule.forRoot(), ProviderModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
