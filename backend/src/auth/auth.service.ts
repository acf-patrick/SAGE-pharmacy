import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,
    private userService: UserService,
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  private generateAccessToken(name: string) {
    return this.jwt.sign(
      {
        name,
      },
      {
        expiresIn: '15m',
      },
    );
  }

  private generateRefreshToken(name: string) {
    return this.jwt.sign(
      {
        name,
      },
      {
        expiresIn: '1d',
        secret: this.configService.get<string>('REFRESH_SECRET'),
      },
    );
  }

  // Register user and returns the ID
  async register(name: string, password: string) {
    try {
      await this.userService.getUserByName(name);
      throw new ConflictException(`Username '${name}' has already been taken`);
    } catch {
      const salt = await bcrypt.genSalt();
      const hashed = await bcrypt.hash(password, salt);
      const { id } = await this.prisma.user.create({
        data: {
          username: name,
          password: hashed,
        },
        select: {
          id: true,
        },
      });
      return id;
    }
  }

  // Returns new access-token and user-id with valid credentials, otherwise returns unauthorized exception
  async login(name: string, password: string) {
    try {
      const user = await this.userService.getUserByName(name);

      const correct = await bcrypt.compare(password, user.password);
      if (correct) {
        const token = this.generateAccessToken(name);
        return {
          token,
          id: user.id,
        };
      } else {
        throw new UnauthorizedException('Invalid username or password');
      }
    } catch {
      throw new UnauthorizedException('Invalid username or password');
    }
  }
}
