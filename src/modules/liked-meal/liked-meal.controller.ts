import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Query,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { LikedMealService } from './liked-meal.service';

@Controller('liked-meals')
export class LikedMealController {
  constructor(private readonly likedMealService: LikedMealService) {}

  @Post()
  async markAsLiked(
    @Body() body: { itemId: number; userId: number; eventId: number },
  ) {
    const { itemId, userId, eventId } = body;

    if (!itemId || !userId || !eventId) {
      throw new HttpException(
        'Missing required fields',
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.likedMealService.markAsLiked(itemId, userId, eventId);
  }

  @Get()
  async getLikedMeals(
    @Query('id') userId: string,
    @Param('eventId') eventId: string,
  ) {
    if (!userId || !eventId) {
      throw new HttpException(
        'Missing required parameters',
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.likedMealService.getLikedMeals(Number(userId), Number(eventId));
  }

  @Get(':eventId/most-liked')
  async getMostLikedMeals(@Param('eventId') eventId: string) {
    return this.likedMealService.getMostLikedMeals(Number(eventId));
  }
}
