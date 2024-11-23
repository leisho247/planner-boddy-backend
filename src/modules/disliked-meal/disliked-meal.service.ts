import { Injectable } from '@nestjs/common';
import { CreateDislikedMealDto } from 'src/modules/disliked-meal/dto/create-disliked-meal.dto';
import PrismaService from 'prisma/prisma.service';

@Injectable()
export class DislikedMealService {
  constructor(private readonly prisma: PrismaService) {}

  
  async create(createDislikedMealDto: CreateDislikedMealDto) {
    return this.prisma.likedMeal.create({
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
