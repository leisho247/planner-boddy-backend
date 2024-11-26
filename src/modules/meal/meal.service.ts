import { Injectable } from '@nestjs/common';
import { CreateMealDto } from './dto/create-meal.dto';
import { UpdateMealDto } from './dto/update-meal.dto';
import PrismaService from 'prisma/prisma.service';

@Injectable()
export class MealService {
  constructor(private prisma: PrismaService) {}

  async getMeals() {
    try {
      const meals = await this.prisma.meal.findMany({
        select: {
          id: true,
          name: true,
          urlImage: true,
        },
      });
      return meals;
    } catch (error) {
      throw new Error(`Error fetching meals: ${error.message}`);
    }
  }
  create(createMealDto: CreateMealDto) {
    console.log(createMealDto);
    return 'This action adds a new meal';
  }

  findAll() {
    return `This action returns all meal`;
  }

  findOne(id: number) {
    return `This action returns a #${id} meal`;
  }

  update(id: number, updateMealDto: UpdateMealDto) {
    console.log(updateMealDto);
    return `This action updates a #${id} meal`;
  }

  remove(id: number) {
    return `This action removes a #${id} meal`;
  }
}
