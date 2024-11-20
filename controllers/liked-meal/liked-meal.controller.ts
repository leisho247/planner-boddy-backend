import { Controller, Post, Body, Get, Param, HttpStatus } from '@nestjs/common';
import { LikedMealService } from './liked-meal.service';
import { CreateLikedMealDto } from './dto/create-liked-meal.dto';

@Controller('liked-meals')
export class LikedMealController {
  constructor(private readonly likedMealService: LikedMealService) {}

  @Post('mark')
  async markAsLiked(@Body() createLikedMealDto: CreateLikedMealDto) {
    const likedMeal = await this.likedMealService.markAsLiked(createLikedMealDto);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Meal marked as liked successfully.',
      data: likedMeal,
    };
  }

  @Get(':eventId/:userId')
  async getLikedMeals(@Param('userId') userId: string, @Param('eventId') eventId: string) {
    const likedMeals = await this.likedMealService.getLikedMeals(+userId, +eventId);
    return {
      statusCode: HttpStatus.OK,
      message: 'Liked meals retrieved successfully.',
      data: likedMeals,
    };
  }

  @Get('most-liked/:eventId')
  async getMostLikedMeals(@Param('eventId') eventId: string) {
    const mostLikedMeals = await this.likedMealService.getMostLikedMeals(+eventId);
    return {
      statusCode: HttpStatus.OK,
      message: 'Most liked meals retrieved successfully.',
      data: mostLikedMeals,
    };
  }
}
