import {
  ServiceUnavailableException,
  Body,
  Post,
  Controller,
} from '@nestjs/common';
import { MailService } from './mail.service';
import { SendOrderBillDto } from './dto/SendOrderBill.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('api/mail')
@ApiTags('📧 Mail')
export class MailController {
  constructor(private mailService: MailService) {}

  @Post('order')
  @ApiOperation({ summary: 'Send bill to provider' })
  sendOrderBill(@Body() { providerName, mail, subject }: SendOrderBillDto) {
    return this.mailService.sendOrderBill(providerName, mail, subject);
  }
}
