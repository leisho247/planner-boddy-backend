import { Controller, Post, Get, Body, Param, Query, HttpException, HttpStatus } from '@nestjs/common';
import { DislikedMovieService } from './disliked-movie.service';

@Controller('disliked-movies')
export class DislikedMovieController {
  constructor(private readonly dislikedMovieService: DislikedMovieService) {}

  @Post()
  async markAsDisliked(@Body() body: { itemId: number; userId: number; eventId: number }) {
    const { itemId, userId, eventId } = body;

    if (!itemId || !userId || !eventId) {
      throw new HttpException('Missing required fields', HttpStatus.BAD_REQUEST);
    }

    return this.dislikedMovieService.markAsDisliked(itemId, userId, eventId);
  }

  @Get()
  async getDislikedMovies(
    @Query('id') userId: string,
    @Param('eventId') eventId: string,
  ) {
    if (!userId || !eventId) {
      throw new HttpException('Missing required parameters', HttpStatus.BAD_REQUEST);
    }

    return this.dislikedMovieService.getDislikedMovies(Number(userId), Number(eventId));
  }
}
