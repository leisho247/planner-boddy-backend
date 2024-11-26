import { Module } from '@nestjs/common';
import PrismaService from 'prisma/prisma.service';
import { LikePlaceController } from './like-place.controller';
import { LikePlaceService } from './like-place.service';

@Module({
  controllers: [LikePlaceController],
  providers: [LikePlaceService, PrismaService],
})
export class LikePlaceModule {}
