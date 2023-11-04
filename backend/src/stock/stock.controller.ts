import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Query,
} from '@nestjs/common';
import { StockService } from './stock.service';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { UpdateMedicineDto } from './dto/UpdateMedicine.dto';

@Controller('api/stock')
export class StockController {
  constructor(private readonly stockService: StockService) {}

  @Get()
  @ApiQuery({ name: 'page', description: 'Page index to fetch ' })
  @ApiOkResponse({ description: 'Returns medicines list' })
  @ApiBadRequestResponse({ description: 'Page index overflow' })
  async getPage(@Query('page', ParseIntPipe) page: number) {
    const pageCount = await this.stockService.getPageCount();
    if (page >= pageCount) {
      throw new BadRequestException({
        message: 'Page index overflow',
        pageCount,
      });
    }

    const medicines = await this.stockService.getPage(page);

    return {
      data: medicines,
      pageCount,
      page,
    };
  }

  @Get(':id')
  async getMedicine(@Param('id') id: string) {
    const medicine = await this.stockService.getMedicine(id);
    if (!medicine) {
      throw new NotFoundException(`No medicine with ID ${id} found`);
    }

    return medicine;
  }

  @Delete(':id')
  async deleteMedicine(@Param('id') id: string) {
    try {
      await this.stockService.deleteMedicine(id);
    } catch {
      throw new NotFoundException(`No medicine with ID ${id} found`);
    }
    return `Medicine ${id} removed`;
  }

  @Patch(':id')
  @ApiOkResponse({ description: 'Medicine item successfully updated' })
  @ApiBadRequestResponse({ description: 'Invalid body format' })
  @ApiParam({ name: 'id', description: "medicine's ID" })
  async updateMedicine(
    @Param('id') id: string,
    @Body() updateMedicineDto: UpdateMedicineDto,
  ) {
    await this.stockService.updateMedicine(id, updateMedicineDto);
    return `Medicine ${id} updated`;
  }
}
