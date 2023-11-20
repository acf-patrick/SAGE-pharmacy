import { ISendMailOptions, MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailService {
  constructor(
    private mailerService: MailerService,
    private configService: ConfigService,
  ) {}

  sendMail(options: Omit<ISendMailOptions, 'from'>) {
    return this.mailerService.sendMail(options);
  }

  sendGreetings(name: string, email: string) {
    return this.sendMail({
      to: email,
      subject: 'Greetings 👋',
      template: './greetings',
      sender: {
        address: this.configService.get('MAILER_USER'),
        name: 'Pharmacie Hasimbola',
      },
      context: { name },
    });
  }
}
