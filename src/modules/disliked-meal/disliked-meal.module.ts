import { Module } from '@nestjs/common';
import { DislikedMealService } from './services/disliked-meal.service';
import { DislikedMealController } from './controllers/disliked-meal.controller';
import { PrismaService } from '../../common/prisma/prisma.service';

@Module({
  controllers: [DislikedMealController],
  providers: [DislikedMealService, PrismaService],
})
export class DislikedMealModule {}
