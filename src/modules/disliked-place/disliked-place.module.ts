import { Module } from '@nestjs/common';
import { DislikedPlaceController } from './disliked-place.controller';
import { DislikedPlaceService } from './disliked-place.service';
import PrismaService from 'prisma/prisma.service';


@Module({
  controllers: [DislikedPlaceController],
  providers: [DislikedPlaceService, PrismaService],
})
export class DislikedPlaceModule {}
