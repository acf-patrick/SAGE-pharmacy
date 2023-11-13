import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    PrismaModule,
    UserModule,
    JwtModule.registerAsync({
      async useFactory(configService: ConfigService) {
        return {
          secret: configService.get<string>('ACCESS_SECRET'),
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class AuthModule {}
