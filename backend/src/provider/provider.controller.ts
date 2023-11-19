import {
  Get,
  Body,
  Post,
  Param,
  HttpCode,
  NotFoundException,
  Controller,
  UseGuards,
} from '@nestjs/common';
import { ProviderService } from './provider.service';
import { StockService } from '../stock/stock.service';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiProperty,
  ApiTags,
} from '@nestjs/swagger';
import { MatchMedicinesDTO } from './dto/MatchMedicines.dto';
import { AccessTokenGuard } from 'src/auth/guards/access-token.guard';
import { UpdateMatchesDto } from './dto/UpdateMatches.dto';

@ApiTags('🏭 Provider')
@Controller('api/provider')
@UseGuards(new AccessTokenGuard())
export class ProviderController {
  constructor(
    private readonly providerService: ProviderService,
    private stockService: StockService,
  ) {}

  @Post('medicine/update-matches')
  @ApiOperation({
    summary: 'Update matching medicine from stock for medicine from providers',
  })
  async updateMedicineMatches(@Body() { matches }: UpdateMatchesDto) {
    await this.providerService.updateMatches(matches);
  }

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
    const ids = (await this.stockService.getNearLowMedicines()).map(
      (record) => record.id,
    );

    return this.providerService.getMatchingMedicinesForList(ids);
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
