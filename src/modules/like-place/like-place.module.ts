import { Module } from '@nestjs/common';
import { LikePlaceService } from './services/like-place.service';
import { LikePlaceController } from './controllers/like-place.controller';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  imports: [LikePlaceModule],
  controllers: [LikePlaceController],
  providers: [LikePlaceService, PrismaService],
})
export class LikePlaceModule {}
