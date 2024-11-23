import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateDislikedMealDto } from '../dto/create-disliked-meal.dto';

@Injectable()
export class DislikedMealService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createDislikedMealDto: CreateDislikedMealDto) {
    return this.prisma.LikedMeal.create({
      data: createDislikedMealDto,
    });
  }

  findAll() {
    return `This action returns all dislikedMeal`;
  }

  findOne(id: number) {
    return `This action returns a #${id} dislikedMeal`;
  }

  remove(id: number) {
    return `This action removes a #${id} dislikedMeal`;
  }
}
