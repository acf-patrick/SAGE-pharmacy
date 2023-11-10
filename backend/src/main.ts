import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { PrismaClientExceptionFilter } from './prisma-client-exception/prisma-client-exception.filter';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  const configs = app.get<ConfigService>(ConfigService);
  const prod = configs.get<string>('NODE_ENV') === 'production'

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
