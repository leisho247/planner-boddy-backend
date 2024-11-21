import { Module } from '@nestjs/common';
import { LikePlaceService } from './services/like-place.service';
import { LikePlaceController } from './controllers/like-place.controller';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Module({
  controllers: [LikePlaceController],
  providers: [LikePlaceService, PrismaService],
})
export class LikePlaceModule {}
