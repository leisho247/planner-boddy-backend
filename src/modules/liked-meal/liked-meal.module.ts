import { Module } from '@nestjs/common';
import { LikedMealController } from './liked-meal.controller';
import { LikedMealService } from './liked-meal.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [LikedMealController],
  providers: [LikedMealService, PrismaService],
})
export class LikedMealModule {}