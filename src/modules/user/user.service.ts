import { Injectable } from '@nestjs/common';
import PrismaService from 'prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(createUserDto: CreateUserDto) {
    return this.prisma.user.create({
      data: createUserDto as any,
    });
  }

  async getUser(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }
}
