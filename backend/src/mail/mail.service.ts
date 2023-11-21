import { ISendMailOptions, MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  private sendMail(options: Omit<ISendMailOptions, 'from'>) {
    return this.mailerService.sendMail(options);
  }

  foo() {
    this.sendMail({
        
    })
  }
}
