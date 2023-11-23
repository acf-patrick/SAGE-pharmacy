import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Query,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ReceiptService } from './receipt.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

@Controller('api/evidence')
@ApiTags('🧾 Receipt')
export class ReceiptController {
  constructor(private readonly evidenceService: ReceiptService) {}

  @Get()
  @ApiOperation({ summary: 'Get list of receipts ID for given order' })
  async getReceipts(@Query('orderId') orderId: string) {
    const records = await this.evidenceService.getReceipts(orderId);
    if (records.length == 0) {
      throw new NotFoundException(`No evidence found for ${orderId}`);
    }

    return {
      ids: records.map((record) => record.id),
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get receipt file with given ID' })
  async getReceipt(@Param('id') id: string, @Res() res: Response) {
    const out = await this.evidenceService.getReceipt(id);
    out.pipe(res);
  }

  @Post()
  @ApiOperation({ summary: 'Upload a receipt for an order' })
  @UseInterceptors(FileInterceptor('file'))
  async upload(
    @Body() { orderId }: { orderId: string },
    @UploadedFile() file: Express.Multer.File,
  ) {
    const id = await this.evidenceService.registerNewFile(
      orderId,
      file.filename,
      file.mimetype.split('/')[1],
    );
    return { id };
  }
}
