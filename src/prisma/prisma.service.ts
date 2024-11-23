// src/common/prisma/prisma.service.ts
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
<<<<<<< HEAD
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
=======
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {

>>>>>>> features/usersInEvent
  constructor() {
    super({
      datasources: {
        db: {
          url: process.env.DATABASE_URL,
        },
      },
    });
  }
<<<<<<< HEAD

=======
>>>>>>> features/usersInEvent
  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
