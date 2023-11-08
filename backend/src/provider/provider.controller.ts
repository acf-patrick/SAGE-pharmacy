import {
  Get,
  Body,
  Post,
  Param,
  NotFoundException,
  Controller,
} from '@nestjs/common';
import { ProviderService } from './provider.service';
import { StockService } from '../stock/stock.service';
import { ApiOperation } from '@nestjs/swagger';
import { MedicineFromProvider } from '@prisma/client';
import { MatchMedicinesDTO } from './dto/MatchMedicines.dto';

@Controller('api/provider')
export class ProviderController {
  constructor(
    private readonly providerService: ProviderService,
    stockService: StockService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Returns all provider with their medicines' })
  getAllProviders() {
    return this.providerService.getAll();
  }

  @Post('match')
  async getMatchingMedicines(@Body() { names }: MatchMedicinesDTO) {
    const map = new Map<string, any>();
    for (let name of names) {
      let medicines: any = await this.providerService.getMatchingMedicines(name);
      if (medicines.length > 0) {
        const tmp = [];
        for (let medicine of medicines) {
          const provider = await this.providerService.getOne(medicine.providerId);
          tmp.push({
            medicine: medicine,
            providerName: provider.name
          });
        }
        medicines = tmp
        map.set(name, medicines);
      }
    }

    if (map.size === 0) {
      throw new NotFoundException('No matching medicines for given names');
    }

    let ret: any = {};
    for (let key of map.keys()) {
      ret[key] = map.get(key);
    }

    return ret;
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
