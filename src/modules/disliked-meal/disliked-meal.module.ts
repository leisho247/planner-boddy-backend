import { Module } from '@nestjs/common';
import PrismaService from 'prisma/prisma.service';
import { DislikedMealController } from './disliked-meal.controller';
import { DislikedMealService } from './disliked-meal.service';



@Module({
  controllers: [DislikedMealController],
  providers: [DislikedMealService, PrismaService],
})
export class DislikedMealModule {}


