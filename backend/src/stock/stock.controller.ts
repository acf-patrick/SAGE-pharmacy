import {
  BadRequestException,
  Controller,
  Get,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { StockService } from './stock.service';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiQuery,
} from '@nestjs/swagger';

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
}
