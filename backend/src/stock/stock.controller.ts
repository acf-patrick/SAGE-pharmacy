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
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { UpdateMedicineDto } from './dto/UpdateMedicine.dto';

@ApiTags('Stock 📦')
@Controller('api/stock')
export class StockController {
  constructor(private readonly stockService: StockService) {}

  @Get()
  @ApiQuery({
    name: 'page',
    description: 'Page index to fetch',
    required: false,
  })
  @ApiBadRequestResponse({ description: 'Page index overflow' })
  @ApiOperation({ summary: 'Returns medicines list according to query' })
  async getMedicines(
    @Query('page', new ParseIntPipe({ optional: true })) page?: number,
    @Query('name') name?: string,
    @Query('sellingPrice', new ParseIntPipe({ optional: true }))
    sellingPrice?: number,
    @Query('costPrice', new ParseIntPipe({ optional: true }))
    costPrice?: number,
    @Query('quantity', new ParseIntPipe({ optional: true })) quantity?: number,
    @Query('min', new ParseIntPipe({ optional: true })) min?: number,
    @Query('max', new ParseIntPipe({ optional: true })) max?: number,
    @Query('location') location?: string,
    @Query('dci') dci?: string,
  ) {
    let query;

    // build query object 😰
    {
      if (dci) {
        query = {
          type: 'dci',
          dci,
        };
      } else if (name) {
        query = { type: 'name', name };
      } else if (location) {
        query = {
          type: 'location',
          location,
        };
      } else if (min >= 0) {
        query = {
          type: 'min',
          min,
        };
      } else if (max >= 0) {
        query = {
          type: 'max',
          max,
        };
      } else if (quantity >= 0) {
        query = {
          type: 'quantity',
          quantity,
        };
      } else if (costPrice >= 0) {
        query = {
          type: 'costPrice',
          costPrice,
        };
      } else if (sellingPrice >= 0) {
        query = {
          type: 'sellingPrice',
          sellingPrice,
        };
      } else {
        query = undefined;
      }
    }

    const pageCount = await this.stockService.getPageCount(query);
    if (pageCount + page === 0) {
      // page == pageCount == 0
      return {
        data: [],
        pageCount,
        page,
      };
    }

    if (page >= pageCount) {
      throw new BadRequestException({
        message: 'Page index overflow',
        pageCount,
      });
    }

    const medicines = await this.stockService.getPage(page, query);
    return {
      data: medicines,
      pageCount,
      page,
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Returns medicine with given ID' })
  async getMedicine(@Param('id') id: string) {
    const medicine = await this.stockService.getMedicine(id);
    if (!medicine) {
      throw new NotFoundException(`No medicine with ID ${id} found`);
    }

    return medicine;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove medicine with given ID' })
  async deleteMedicine(@Param('id') id: string) {
    try {
      await this.stockService.deleteMedicine(id);
    } catch {
      throw new NotFoundException(`No medicine with ID ${id} found`);
    }
    return `Medicine ${id} removed`;
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Updates medicine with given ID from stock' })
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
