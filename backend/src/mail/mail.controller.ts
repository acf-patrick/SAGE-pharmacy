import { Body, Post, Controller } from '@nestjs/common';
import { MailService } from './mail.service';

@Controller('api/mail')
export class MailController {
  constructor(private mailService: MailService) {}

  @Post('greet')
  sendGreetings(@Body() user: { name: string; email: string }) {
    return this.mailService.sendGreetings(user.name, user.email);
  }
}
