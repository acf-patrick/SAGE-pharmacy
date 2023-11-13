import {
  Get,
  Body,
  Post,
  Param,
  HttpCode,
  NotFoundException,
  Controller,
} from '@nestjs/common';
import { ProviderService } from './provider.service';
import { StockService } from '../stock/stock.service';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { MatchMedicinesDTO } from './dto/MatchMedicines.dto';

@ApiTags('🏭 Provider')
@Controller('api/provider')
export class ProviderController {
  constructor(
    private readonly providerService: ProviderService,
    private stockService: StockService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Returns all provider with their medicines' })
  getAllProviders() {
    return this.providerService.getAll();
  }

  @Get('provide')
  @ApiOperation({
    summary:
      'Check medicines with near low quantity and find matches from providers',
  })
  @ApiOkResponse({
    description:
      'Returns a map that has medicine name as key and medicine list from providers ',
  })
  @ApiNotFoundResponse({ description: 'If no matching has been done' })
  async provideMedicinesForNearLow() {
    const names = (await this.stockService.getNearLowMedicines()).map(
      (record) => record.name,
    );

    return this.providerService.getMatchingMedicinesForList(names);
  }

  @Post('match')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Map medicine names to medicines from providers',
  })
  getMatchingMedicines(@Body() { names }: MatchMedicinesDTO) {
    return this.providerService.getMatchingMedicinesForList(names);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Returns one provider' })
  async getOneProvider(@Param('id') id: string) {
    const provider = await this.providerService.getOne(id);
    if (!provider) {
      throw new NotFoundException(`Provider with ID ${id} not found`);
    }

    return provider;
  }
}
