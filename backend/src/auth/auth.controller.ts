import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupUserDto } from './dto/SignupUser.dto';
import { UserRole } from '@prisma/client';
import { SigninUserDto } from './dto/SigninUser.dto';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { SigninReturnDto } from './dto/SigninReturn.dto';
import { Request } from 'express';
import { RefreshTokenGuard } from './guards/refresh-token.guard';

@Controller('api/auth')
@ApiTags('🔐 Authentication')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  @ApiOperation({ summary: 'Register a new user' })
  async signup(@Body() user: SignupUserDto) {
    if (
      user.role &&
      user.role !== UserRole.ADMIN &&
      user.role !== UserRole.NORMAL
    ) {
      throw new BadRequestException('Invalid user role provided');
    }

    await this.authService.register(user);
    return 'User registered';
  }

  @Post('/signin')
  @ApiOperation({
    description: 'Generate acces token and refresh token for valid credentials',
    summary: 'Sign in user',
  })
  @ApiOkResponse({
    type: SigninReturnDto,
  })
  async signin(@Body() user: SigninUserDto) {
    const { token: accesToken, id } = await this.authService.login(
      user.name,
      user.password,
    );

    const refreshToken = this.authService.generateRefreshToken(user.name);
    return {
      id,
      accesToken,
      refreshToken,
    };
  }

  @Get('/refresh-tokens')
  @UseGuards(RefreshTokenGuard)
  @ApiOperation({ summary: 'Refresh access tokens' })
  async refreshTokens(@Req() req: Request) {
    const user = req.user!;
    const refreshToken: string = user['refreshToken'];
    return this.authService.refreshTokens(refreshToken);
  }
}
