import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as fs from 'fs';
import { join } from 'path';
import { AppModule } from './app.module';
import { PrismaClientExceptionFilter } from './prisma-client-exception/prisma-client-exception.filter';

const httpsOptions =
  process.env.NODE_ENV === 'production'
    ? {
        key: fs.readFileSync(join(__dirname, '..', 'secrets', 'cert.key')),
        cert: fs.readFileSync(join(__dirname, '..', 'secrets', 'cert.crt')),
      }
    : undefined;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    httpsOptions,
  });

  app.useGlobalPipes(new ValidationPipe());

  const configs = app.get<ConfigService>(ConfigService);
  const prod = configs.get<string>('NODE_ENV') === 'production';

  if (!prod) {
    app.enableCors();

    const config = new DocumentBuilder()
      .setTitle('Pharmacie')
      .setDescription('Logiciel pharmacie Hasimbola')
      .setVersion('0.1')
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document);
  }

  app.useGlobalFilters(new PrismaClientExceptionFilter());

  const PORT = configs.get<string>('PORT') || 3000;
  await app.listen(PORT);
}
bootstrap();
