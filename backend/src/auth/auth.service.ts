import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private prisma: PrismaService,
  ) {}

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

  // Returns new access-token and refresh-token with valid credentials, otherwise returns unauthorized exception
  async login(name: string, password: string) {
    try {
      const user = await this.userService.getUserByName(name);

      const correct = await bcrypt.compare(password, user.password);
      if (correct) {
      } else {
        throw new UnauthorizedException('Invalid username or password');
      }
    } catch {
      throw new UnauthorizedException('Invalid username or password');
    }
  }
}
