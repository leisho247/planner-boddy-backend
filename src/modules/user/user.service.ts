import { Injectable } from '@nestjs/common';
import PrismaService from 'prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-data.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    return this.prisma.user.create({
      data: {
        ...createUserDto,
        password: hashedPassword,
      },
    });
  }

  async login(loginData: LoginUserDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: loginData.email },
    });
    if (user && (await bcrypt.compare(loginData.password, user.password))) {
      const token = this.jwtService.sign({ id: user.id, email: user.email });
      return { accessToken: token };
    }
    throw new Error('Invalid credentials');
  }

  async logout(user: any): Promise<any> {
    // Aquí puedes manejar la lógica de logout
    // Por ejemplo: invalidar tokens, registrar actividad, etc.
    return { message: `User ${user.email} logged out successfully.` };
  }
}
