import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLikedMealDto } from './dto/create-liked-meal.dto';

@Injectable()
export class LikedMealService {
  constructor(private readonly prisma: PrismaService) {}

  async markAsLiked(createLikedMealDto: CreateLikedMealDto) {
    const { mealId, userId, eventId } = createLikedMealDto;

    try {
      const likedMeal = await this.prisma.usersLikedMeals.create({
        data: {
          mealId,
          userId,
          eventId,
        },
      });

      return likedMeal;
    } catch (error) {
      // Si ya existe un like previo, capturamos el error P2002 (violación de restricción única)
      if (error.code === 'P2002') {
        return {
          message: 'You already liked this meal.',
        };
      }
      throw error;
    }
  }

  async getLikedMeals(userId: number, eventId: number) {
    return this.prisma.usersLikedMeals.findMany({
      where: { userId, eventId },
      select: {
        mealId: true,
        userId: true,
        eventId: true,
      },
    });
  }

  async getMostLikedMeals(eventId: number) {
    // Obtener las comidas más gustadas, agrupando por `mealId` y ordenando por la cantidad de likes
    const likedMeals = await this.prisma.usersLikedMeals.groupBy({
      by: ['mealId'],
      where: { eventId },
      _count: {
        userId: true,
      },
      orderBy: {
        _count: {
          userId: 'desc',
        },
      },
      take: 3,
    });

    // Obtener los detalles de las comidas más gustadas
    const mealIds = likedMeals.map(meal => meal.mealId);
    const mealDetails = await this.prisma.meal.findMany({
      where: {
        id: { in: mealIds },
      },
      select: {
        id: true,
        name: true,
        urlImage: true,
      },
    });

    return likedMeals.map(meal => {
      const mealDetail = mealDetails.find(detail => detail.id === meal.mealId);
      return {
        mealId: meal.mealId,
        title: mealDetail?.name || 'Unknown title',
        urlImage: mealDetail?.urlImage || 'Unknown image',
        likes: meal._count.userId,
      };
    });
  }
}
