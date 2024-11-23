import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import PrismaService from 'prisma/prisma.service';


@Injectable()
export class LikedMealService {
  constructor(private readonly prisma: PrismaService) {}

  async markAsLiked(mealId: number, userId: number, eventId: number) {
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
      if (error.code === 'P2002') {
        throw new HttpException(
          'You already liked this meal.',
          HttpStatus.OK,
        );
      }
      throw new HttpException(
        'Error creating liked meal',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getLikedMeals(userId: number, eventId: number) {
    try {
      const likedMeals = await this.prisma.usersLikedMeals.findMany({
        where: { userId, eventId },
        select: {
          mealId: true,
          userId: true,
          eventId: true,
        },
      });

      return likedMeals;
    } catch (error) {
      throw new HttpException(
        'Error fetching liked meals',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getMostLikedMeals(eventId: number) {
    try {
      const likedMeals = await this.prisma.usersLikedMeals.groupBy({
        by: ['mealId'],
        where: { eventId },
        _count: { userId: true },
        orderBy: {
          _count: { userId: 'desc' },
        },
        take: 3,
      });

      const mealIds = likedMeals.map((meal) => meal.mealId);

      const mealDetails = await this.prisma.meal.findMany({
        where: { id: { in: mealIds } },
        select: {
          id: true,
          name: true,
          urlImage: true,
        },
      });

      const formattedResults = likedMeals.map((meal) => {
        const mealDetail = mealDetails.find((detail) => detail.id === meal.mealId);
        return {
          mealId: meal.mealId,
          title: mealDetail?.name || 'Unknown title',
          urlImage: mealDetail?.urlImage || 'Unknown image',
          likes: meal._count.userId,
        };
      });

      return formattedResults;
    } catch (error) {
      throw new HttpException(
        'Error fetching most liked meals',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
